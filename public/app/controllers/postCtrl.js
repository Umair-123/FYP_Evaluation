angular.module('postCtrl', ['postService'])


	.controller('postController', function(Post , socketio) {


		var vm = this;

		Post.all()
			.success(function(data) {
				vm.posts = data;
			});


		vm.createPost = function() {

			vm.processing = true;

   
			vm.message = '';
			Post.create(vm.postData)
				.success(function(data) {
					vm.processing = false;
					//clear up the form
					vm.postData = {};

					vm.message = data.message;

					
				});

		};

		socketio.on('post', function(data) {
			vm.posts.push(data);
		})

})

.controller('AllPostsController', function(Post, socketio) {

	var vm = this;
	Post.allPosts()
	.success(function(data){
		vm.posts = data;
	});

	socketio.on('post', function(data) {
			vm.posts.push(data);
	});



});
	

