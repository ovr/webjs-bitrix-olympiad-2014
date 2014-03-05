ns('App.view.Index', Backbone.View.extend({
	events: {
		'click #start': 'onStartButtonClick',
		'click .options': 'onOptionsClick'
	},
	roundTime: 10,
	currentRoundTime: this.roundTime,
	resultsTotal: 5,
	initialize: function() {
		var opts = {
			lines: 12,
			angle: 0.15,
			lineWidth: 0.44,
			pointer: {
				length: 0.9,
				strokeWidth: 0.035,
				color: '#000000'
			},
			limitMax: true,
			colorStart: '#6FADCF',
			colorStop: '#8FC0DA',
			strokeColor: '#E0E0E0',
			generateGradient: true
		};
		var target = document.getElementById('gauge');
		this.gauge = new Gauge(target).setOptions(opts);
		this.gauge.maxValue = 3000;
		this.gauge.animationSpeed = 32;
		this.gauge.set(0);

		this.$startButton = this.$('#start');
		this.$optionsIcon = this.$('.options');

		var localStorage = window.localStorage;

		var roundTime = localStorage.getItem('roundTime');
		if (roundTime == undefined) {
			localStorage.setItem('roundTime', this.roundTime);
		} else {
			this.roundTime = roundTime;
		}

		var resultsTotal = localStorage.getItem('resultsTotal');
		if (resultsTotal == undefined) {
			localStorage.setItem('resultsTotal', this.resultsTotal);
		} else {
			this.resultsTotal = resultsTotal;
		}

		var results = localStorage.getItem('results');
		if (results == undefined) {
			localStorage.setItem('results', []);
		}

		this.$max = this.$('.max');
		this.$cur = this.$('.cur');
		this.$resultsTable = this.$('#results tbody');
		this.$area = this.$('#checkAreaBox');

		this.$optionsModal = $('#optionsModal');
		Backbone.on('options:update', $.proxy(this.updateOptions, this));
	},
	/**
	 * Буду обновлять настройки приложения вызывая глобальный тригер в OptionsModal
	 * @param roundTime
	 * @param resultsTotal
	 */
	updateOptions: function(roundTime, resultsTotal) {

	},
	onGameMouseLeave: function(e) {

	},
	onOptionsClick: function(e) {
		new App.view.OptionsModal({el: this.$optionsModal});
	},
	/**
	 * Начинаем игру
	 */
	startGame: function() {
		this.cur = 0;
		this.$cur.html(0);

		this.max = 0;
		this.$max.html(0);

		this.currentRoundTime = this.roundTime;
		$(document).bind('mousemove', $.proxy(this.mouseMove, this));
		this.$area.mouseleave($.proxy(this.endGame, this));
		this.interval = setInterval($.proxy(this.gameInterval, this), 1000);
	},
	endGame: function() {
		clearInterval(this.interval);
		this.$area.unbind();
		$(document).unbind('mousemove');

		var row = $('<tr/>'),
			today = new Date();

		row.append(
			$('<td/>',{
				text:''
			}),
			$('<td/>',{
				text: today.toLocaleString()
			}),
			$('<td/>',{
				text:this.max + 'px/sec'
			})
		);
		this.$resultsTable.append(row);

		this.$optionsIcon.show();
		this.$startButton.removeAttr('disabled')
	},
	mouseMove: function(e) {
		if (this.lastX == undefined) {
			this.lastX = e.clientX;
		} else {
			this.cur += Math.abs(this.lastX - e.clientX);
			this.lastX = e.clientX;
		}

		if (this.lastY == undefined) {
			this.lastY = e.clientY;
		} else {
			this.cur += Math.abs(this.lastY - e.clientY);
			this.lastY = e.clientY;
		}

		this.gauge.set(this.cur);
	},
	gameInterval: function() {
		this.currentRoundTime--;

		var cur = this.cur;
		this.$cur.html(cur);
		if (cur > this.max) {
			this.max = cur;
			this.$max.html(cur);
		}
		this.cur = 0;

		if (this.currentRoundTime == 1) {
			this.endGame();
		}
	},
	onStartButtonClick: function(e) {
		this.$startButton.attr('disabled','disabled');
		this.$optionsIcon.hide();
		this.startGame();
	}
}));