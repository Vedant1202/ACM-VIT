
        $(function () {
          $(document).scroll(function () {
            var $nav = $(".sticky-top");
            $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
            $nav.toggleClass('shadow-lg', $(this).scrollTop() > $nav.height());
          });
        });

        ////////////////////////// AOS Initialisation ////////////////////////////

        AOS.init({
          duration: 500,
        });

        ///////////////////////////// AOS Ends //////////////////////////////////



        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////////// Feedback web-dev javascript ////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        (function () {

        	var margin = {
        		top: 10,
        		bottom: 10,
        		left: 10,
        		right: 10
        	};
        	var width = 700 - margin.left - margin.right,
        		height = 500 - margin.top - margin.bottom;

        	var labelsWidth = 600 * 0.25;
        	var labelWidth = labelsWidth * 0.2;
        	var labelHeight = labelWidth * 0.6;

        	var animateDuration = 300;
        	var outerRadius = width-labelsWidth < height? (width-labelsWidth)/2 : height/2;
        	var innerRadius = outerRadius * 0.4; // 40%

        	var arc = d3.svg.arc()
        		.innerRadius(innerRadius)
        		.outerRadius(outerRadius);

        	var pie = d3.layout
        		.pie()
        		.sort(null)
        		.value(getValue)
        		.startAngle(1.1*Math.PI)
        		.endAngle(3.1*Math.PI);

        	var color = d3.scale.category20();

        	var chart = d3.select('.chart')
        		.attr({
        			width: width + margin.left + margin.right,
        			height: height + margin.top + margin.bottom
        		})
        		.append('g')
        		.attr({
        			class: 'labels',
        			transform: 'translate(' + (width-(labelsWidth + margin.right)) + ', ' + margin.top + ')'
        		})
        		.select(getParent)
        		.append('g')
        		.attr({
        			class: 'pie',
        			transform: 'translate(' + (outerRadius + margin.left) + ', ' + (height/2 + margin.top) + ')'
        		})
        		.select(getParent)
        		.append('g')
        		.attr({
        			class: 'main-legend',
        			transform: 'translate(' + (outerRadius + margin.left) + ', ' + (outerRadius + margin.top) + ')'
        		})
        		.select(getParent);

        	chart.select('.main-legend')
        		.append('circle')
        		.attr({
        			class: 'border',
        			opacity: 0,
        			stroke: 'rgba(255,255,255,1)',
        			fill: 'rgba(0,0,0,0)',
        			r: innerRadius*0.64
        		})
        		.select(getParent)
        		.append('circle')
        		.attr({
        			class: 'circle',
        			opacity: 0,
        			fill: 'rgba(255,255,255,1)',
        			r: innerRadius*0.6
        		})
        		.select(getParent)
        		.append('line')
        		.attr({
        			opacity: 0,
        			stroke: 'rgba(255,255,255,1)',
        			x1: 0,
        			y1: 0,
        			x2: 0,
        			y2: 0
        		})
        		.select(getParent)
        		.append('text')
        		.attr({
        			class: 'legend-title',
        			'font-size': '18px',
        			y: -1 * innerRadius * 0.13,
        			'font-family': 'Arial',
        			'text-anchor': 'middle',
        			'alignment-baseline': 'middle',
        			fill: '#fff'
        		})
        		.select(getParent)
        		.append('text')
        		.attr({
        			class: 'description',
        			'font-size': '14px',
        			y: innerRadius * 0.13,
        			'font-family': 'Arial',
        			'text-anchor': 'middle',
        			'alignment-baseline': 'middle',
        			fill: '#fff'
        		});

        	function getParent() {
        		return this.parentNode;
        	}

        	function getValue(d) {
        		return d.value;
        	}

        	function createArray() {
        		var data = [
              {value: 12, name:"5/5"},
              {value: 28, name:"4/5"},
              {value: 8, name:"3/5"},
              {value: 1, name:"1/5"}
            ];
        		// var name = 'Test ';
        		// }
        		return data;
        	}

        	function getSum(data) {
        		var _sum = 0;
        		data.forEach(function addValue(item) {
        			_sum += item.value;
        		});
        		return _sum;
        	}

        	function arcTween(d) {
        		var i;
        		function toArc(t) {
        			return arc(i(t));
        		}
        		function toEndAngle(t) {
        			d.endAngle = i(t);
        			return arc(d);
        		}

        		if ('undefined' === typeof this._current) {
        			i = d3.interpolate(d.startAngle+0.1, d.endAngle);
        			this._current = d;
        			return toEndAngle;
        		}
        		i = d3.interpolate(this._current, d);
        		this._current = i(0);
        		return toArc;
        	}

        	function labelAnimation(d) {
        		return 'translate (' + arc.centroid(d) + ')';
        	}

        	function fill(d, i) {
        		return color(i);
        	}

        	function selectArcAnimation(_d) {
        		var dist = outerRadius * 0.05;
        		_d.midAngle = ((_d.endAngle - _d.startAngle) / 2) + _d.startAngle;
        		var x = Math.sin(_d.midAngle) * dist;
        		var y = -Math.cos(_d.midAngle) * dist;
        		return 'translate(' + x + ',' + y + ')';
        	}

        	function updatePie(data) {
        		var sum = getSum(data);
        		data = pie(data);
        		var arcs = chart.select('.pie')
        			.selectAll('.arc')
        			.data(data);

        		var isDelay = arcs.selectAll('path').length;
        		var _duration = isDelay? animateDuration : animateDuration/2;

        		function getPercent(d) {
        			return ((d.value/sum)*100).toFixed(1) + '%';
        		}

        		function getLegend(d) {
        			return d.data.name + ' | ' + d.data.value;
        		}

        		function liveLarge(d) {
        			var angle = 360 * (d.value/sum);
        			var arcLength = (Math.PI * (outerRadius/2) * angle) / 180;
        			return arcLength > Math.PI*outerRadius*0.01;
        		}

        		function onMouseIn(d, i) {
        			var label = chart.selectAll('.legend')
        					.filter(function(_d, _i) {
        						return i===_i;
        					});
        			if (!label.attr('data-exit')) {
        				label.transition()
        					.duration(animateDuration/2)
        					.attr({
        						opacity: 1,
        						transform: 'translate(10, '+ ((labelHeight + 5) * i) +')'
        					});
        			}

        			chart.selectAll('.arc')
        				.filter(function(_d, _i) {
        					return i===_i;
        				})
        				.transition()
        				.duration(animateDuration/2)
        				.attr('transform', selectArcAnimation);

        			chart.select('.main-legend')
        				.select('.border')
        				.transition()
        				.duration(animateDuration/2)
        				.attr({
        					opacity: 1,
        					stroke: fill(null, i)
        				});

        			chart.select('.main-legend')
        				.select('.circle')
        				.transition()
        				.duration(animateDuration/2)
        				.attr({
        					opacity: 1,
        					fill: fill(null, i)
        				});

        			chart.select('.main-legend')
        				.select('line')
        				.transition()
        				.duration(animateDuration/2)
        				.attr({
        					opacity: 1,
        					stroke: fill(null, i),
        					x1: Math.sin(d.midAngle) * (innerRadius*0.7),
        					y1: -Math.cos(d.midAngle) * (innerRadius*0.7),
        					x2: Math.sin(d.midAngle) * innerRadius,
        					y2: -Math.cos(d.midAngle) * innerRadius
        				});

        			chart.select('.main-legend')
        				.select('.legend-title')
        				.text(d.data.name)
        				.select(getParent)
        				.select('.description')
        				.text("No. of votes: " + d.data.value)
        		}
        		function onMouseOut(d, i) {
        			chart.select('.main-legend')
        					.selectAll(['.circle', '.border'])
        					.transition()
        					.duration(animateDuration/2)
        					.attr({
        						opacity: 0
        					});

        			chart.select('.main-legend')
        					.select('line')
        					.transition()
        					.duration(animateDuration/2)
        					.attr({
        						opacity: 0
        					});

        			chart.select('.main-legend')
        					.select('.legend-title')
        					.text('')
        					.select(getParent)
        					.select('.description')
        					.text('');

        			if ('undefined' === typeof i) {
        				return;
        			}
        			var label = chart.selectAll('.legend')
        				.filter(function(_d, _i) {
        					return i===_i;
        				});

        			if (!label.attr('data-exit')) {
        				label.transition()
        					.duration(animateDuration/2)
        					.attr({
        						opacity: 1,
        						transform: 'translate(0, '+ ((labelHeight + 5) * i) +')'
        					});
        			}

        			chart.selectAll('.arc')
        				.filter(function(_d, _i) {
        					return i===_i;
        				})
        				.transition()
        				.duration(animateDuration/2)
        				.attr({
        					transform: 'translate(0,0)'
        				});
        		}

        		onMouseOut();
        		// update Pie

        		arcs.enter()
        			.append('g')
        			.attr('class', 'arc')
        			.on('mouseenter', onMouseIn)
        			.on('mouseout', onMouseOut)
        			.append('path')
        			.attr({
        				fill: fill
        			})
        			.select(getParent)
        			.filter(liveLarge)
        			.append('text')
        			.attr({
        				'font-family': 'Arial',
        				'font-size': '14px',
        				fill: '#fff',
        				'text-anchor': 'middle'
        			});

        		arcs.select('path')
        			.transition()
        			.delay( function delayFn(d,i) {
        				return isDelay? 0 : _duration*i;
        			})
        			.duration(_duration)
        			.attrTween('d', arcTween);

        		arcs.select('text')
        			.text(getPercent)
        			.transition()
        			.duration(animateDuration)
        			.attr({
        				class: 'label-content',
        				transform: labelAnimation
        			});

        		arcs.exit()
            	.on('mouseenter', null)
        			.on('mouseout', null)
              .remove();

        		// Update Legends

        		var legends = chart
        				.select('.labels')
        				.selectAll('.legend')
        				.data(data);

        		legends.enter()
        			.append('g')
        			.on('mouseenter', onMouseIn)
        			.on('mouseout', onMouseOut)
        			.attr('class', 'legend')
        			.append('rect')
        			.attr({
        				width: labelWidth,
        				height: labelHeight,
        				fill: fill
        			})
        			.select(getParent)
        			.append('text')
        			.attr({
        				'font-size': '14px',
        				'font-family': 'Arial',
        				fill: '#666',
        				x: labelWidth + 5,
        				y: labelHeight/2 + 5
        			})
        			.select(getParent)
        			.attr({
        				opacity: 0,
        				transform: function(d, i) {
        					return 'translate(15, ' + ((labelHeight + 5) * i) + ')';
        				}
        			})
        			.transition()
        			.duration(animateDuration)
        			.attr({
        				opacity: 1,
        				transform: function(d, i) {
        					return 'translate(0, ' + ((labelHeight + 5) * i) + ')';
        				}
        			});

        		legends.exit()
              .on('mouseenter', null)
        			.on('mouseout', null)
        			.attr('data-exit', true)
        			.transition()
        			.duration(animateDuration/2)
        			.attr({
        				opacity: 0,
        				transform: function(d, i) {
        					return 'translate(-15, ' + ((labelHeight + 5) * i) + ')';
        				}
        			})
        			.remove();

        		legends.select('text').text(getLegend);
        	}

        	function generatePie() {
        		var data = createArray();
        		//var data = [{name: 'test 1', value: 100}];
        		updatePie(data);
        	}

        	generatePie();
        } ());

        // Ticker //////////////////////////////////////////////////////////////////

        (function($) {
        	$.simpleTicker = function(element, options) {
        		var defaults = {
        			speed : 700,
        			delay : 4000,
        			easing : 'swing',
        			effectType : 'fade'
        		}
        		var param = {
        			'ul' : '',
        			'li' : '',
        			'initList' : '',
        			'ulWidth' : '',
        			'liHeight' : '',
        			'tickerHook' : 'tickerHook',
        			'effect' : {}
        		}

        		var plugin = this;
        		plugin.settings = {}
        		var $element = $(element),
        			element = element;

        		plugin.init = function() {
        			plugin.settings = $.extend({}, defaults, options);
        			param.ul = element.children('ul');
        			param.li = element.find('li');
        			param.initList = element.find('li:first');
        			param.ulWidth = param.ul.width();
        			param.liHeight = param.li.height();

        			element.css({height:(param.liHeight)});
        			param.li.css({top:'0', left:'0', position:'absolute'});


        			switch (plugin.settings.effectType) {
        				case 'fade':
        					plugin.effect.fade();
        					break;
        				case 'roll':
        					plugin.effect.roll();
        					break;
        				case 'slide':
        					plugin.effect.slide();
        					break;
        			}
        			plugin.effect.exec();
        		}

        		plugin.effect = {};
        		plugin.effect.exec = function() {
        			param.initList.css(param.effect.init.css)
        				.animate(param.effect.init.animate,plugin.settings.speed,plugin.settings.easing)
        				.addClass(param.tickerHook);
        			setInterval(function(){
        				element.find('.' + param.tickerHook)
        					.animate(param.effect.start.animate,plugin.settings.speed,plugin.settings.easing)
        					.next()
        					.css(param.effect.next.css)
        					.animate(param.effect.next.animate,plugin.settings.speed,plugin.settings.easing)
        					.addClass(param.tickerHook)
        					.end()
        					.appendTo(param.ul)
        					.css(param.effect.end.css)
        					.removeClass(param.tickerHook);
        			}, plugin.settings.delay);
        		}

        		plugin.effect.fade = function() {
        			param.effect = {
        				'init' : {
        					'css' : {display:'block',opacity:'0'},
        					'animate' : {opacity:'1',zIndex:'98'}
        				},
        					'start' : {
        					'animate' : {opacity:'0'}
        				},
        				'next' : {
        					'css' : {display:'block',opacity:'0',zIndex:'99'},
        					'animate' : {opacity:'1'}
        				},
        				'end' : {
        					'css' : {display:'none',zIndex:'98'}
        				}
        			}
        		}

        		plugin.effect.roll = function() {
        			param.effect = {
        				'init' : {
        					'css' : {top:'3em',display:'block',opacity:'0'},
        					'animate' : {top:'0',opacity:'1',zIndex:'98'}
        				},
        				'start' : {
        					'animate' : {top:'-3em',opacity:'0'}
        				},
        				'next' : {
        					'css' : {top:'3em',display:'block',opacity:'0',zIndex:'99'},
        					'animate' : {top:'0',opacity:'1'}
        				},
        				'end' : {
        					'css' : {zIndex:'98'}
        				}
        			}
        		}

        		plugin.effect.slide = function() {
        			param.effect = {
        				'init' : {
        					'css' : {left:(200),display:'block',opacity:'0'},
        					'animate' : {left:'0',opacity:'1',zIndex:'98'}
        				},
        				'start' : {
        					'animate' : {left:(-(200)),opacity:'0'}
        				},
        				'next' : {
        					'css' : {left:(param.ulWidth),display:'block',opacity:'0',zIndex:'99'},
        					'animate' : {left:'0',opacity:'1'}
        				},
        				'end' : {
        					'css' : {zIndex:'98'}
        				}
        			}
        		}

        		plugin.init();
        	}

        	$.fn.simpleTicker = function(options) {
        		return this.each(function() {
        			if (undefined == $(this).data('simpleTicker')) {
        				var plugin = new $.simpleTiecker(this, options);
        				$(this).data('simpleTicker', plugin);
        			}
        		});
        	}
        })(jQuery);

        $(function(){
        	$.simpleTicker($('#js-ticker-fade'), {'effectType':'fade'});
        	$.simpleTicker($('#js-ticker-roll'), {'effectType':'roll'});
        	$.simpleTicker($('#js-ticker-slide'), {'effectType':'slide'});
        });

        // ///////////////////////////////////////// Loader for upcoming participants /////////////////////////////////////


        //////////////////////////////////////////////

        // $('#feed-web-dev').click(
            // setTimeout(
              function percentage() {
                // Round percentage to nearest integer (removing the decimal place)
                var percentageRounded = Math.round(82);


                var circle = $('svg circle');
                // var text = $('svg text tspan');

                var radius = circle.attr('r');
                var circumference = Math.PI * (radius * 2);

                circle.css({'stroke-dashoffset': ((100 - percentageRounded) / 100) * circumference});
                // text.text(percentageRounded + '%');
              }
              percentage();
              // }, 2000
          // );
        // );




        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        function openModal() {
          document.getElementById('myModal').style.display = "block";
          // document.getElementById('myModal').style.backgroundsize = "cover";
        }

        function closeModal() {
          document.getElementById('myModal').style.display = "none";
        }

        var slideIndex = 1;
        showSlides(slideIndex);

        function currentSlide(n) {
          showSlides(slideIndex = n);
        }


        function showSlides(n) {
          var i;
          var slides = document.getElementsByClassName("mySlides");
          var dots = document.getElementsByClassName("demo");
          var captionText = document.getElementById("caption");
          if (n > slides.length) {slideIndex = 1}
          if (n < 1) {slideIndex = slides.length}
          for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
          }
          for (i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" active", "");
          }
          slides[slideIndex-1].style.display = "block";
          dots[slideIndex-1].className += " active";
          captionText.innerHTML = dots[slideIndex-1].alt;
        }


        // $('#myModal').click(function{
        //     closeModal();
        // });
