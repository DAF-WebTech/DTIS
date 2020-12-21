document.addEventListener("DOMContentLoaded", function () {

	var stories = JSON.parse(document.getElementById("storiesJson").textContent);

    var categories = %globals_asset_data_attributes:1491151^json_decode^index:select_options^index:value%;

	var regions = %globals_asset_data_attributes:1491149^json_decode^index:select_options^index:value%
	
	var app = new Vue({
		el: "#storyContent",
		data: {
			length: stories.length,
			pageSize: 6,
			pageNum: 1,
			regions: regions,
			categories: categories,
			selectedRegion: "all",
			selectedCategory: "all"
			
		},
		computed: {
			items: function () {

				var filtered = []
				for(var i = 0; i < stories.length; ++i) {
				    var story = stories[i]
				    if ((this.selectedCategory == "all" || story.categories.includes(this.selectedCategory)) &&
	    			        (this.selectedRegion == "all" || story.regions.includes(this.selectedRegion))) {
	    			    filtered.push(story)
	    			}
				}
				
				this.length = filtered.length;
				var startIndex = (this.pageNum - 1) * this.pageSize;
				var sliced = filtered.slice(startIndex, startIndex + this.pageSize);
				return sliced;
			}
		},
		methods: {
			page: function (event) {
				var text = event.target.textContent;
				if (text == "Prev") {
					--this.pageNum;
					this.pageNum = Math.max(1, this.pageNum);
				}
				else if (text == "Next") {
					++this.pageNum;
					this.pageNum = Math.min(Math.ceil(this.length / this.pageSize), this.pageNum);
				}
				else {
					this.pageNum = parseInt(text);
				}

				event.preventDefault();
			},

			filter: function (event) {
				this.selectedCategory = document.getElementById("categorySelect").value;
				this.selectedRegion = document.getElementById("regionSelect").value;
				this.pageNum = 1;
			}
		}
	});
});
