(function(Backbone, _){
	var Application = function (options) {
		this.options = options || {};
		this.plugins = {};
	};

	_.extend(Application.prototype, Backbone.Event, {
		initLayout: function () {
			if (this.options.layout) {
				this.layout = this.options.layout;

				_.each(this.options.pages || {}, function (View, selector) {
					if (this.layout.$(selector).length) {
						new View({el: this.layout.$(selector)});
					}
				}, this);

				_.each(this.options.plugins || {}, function (View, selector) {
					this.plugins[selector] = {};
					_.each(this.layout.$(selector), function (el) {
						var view = new View({el: el});
						this.plugins[selector][el] = view;
					}, this);
				}, this);
			}
			return this;
		},
		run: function () {
			this.initLayout();
		}
	});

	Backbone.$(function(){
		new Application({
			layout: new App.views.Layout({
				el: Backbone.$('html')
			}),
			pages: {
				'.index-index-index': App.view.Index
			},
			plugins: {

			}
		}).run();
	});
})(Backbone, _);
