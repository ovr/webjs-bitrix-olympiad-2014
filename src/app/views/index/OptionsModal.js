ns('App.view.OptionsModal', Backbone.View.extend({
	events: {
		'keypress input': 'optionsUpdate'
	},
	initialize: function(options) {
		$(this.el).modal('show');
	},
	optionsUpdate: function(e) {
		var $roundTime = this.$('#roundTime'),
			$resultsTotal = this.$('#resultsTotal');

		Backbone.trigger('admire:done', $roundTime, $resultsTotal);
	}
}));