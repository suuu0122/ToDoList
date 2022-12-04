app = Vue.createApp({
	data() {
		return {
			initialPage: true,
			createTaskPage: false,
			checkTasksPage: false,
			userName: "",
			taskName: "",
			taskContents: "",
			taskList: {}
		}
	},

	methods: {
		create_task() {
			if (this.taskName === "") {
				alert("Write your task name");
			} else if (this.taskContents === "") {
				alert("Write your task contents");
			} else {
				this.taskList[this.taskName] = this.taskContents;
				this.taskName = "";
				this.taskContents = "";
			}
		},

		move_initialPage() {
			this.initialPage = true;
			this.createTaskPage = false;
			this.checkTasksPage = false;
		},

		move_createTasksPage() {
			this.initialPage = false;
			this.createTaskPage = true;
			this.checkTasksPage = false;
		},

		move_checkTasksPage() {
			if (Object.keys(this.taskList).length === 0) {
				alert("No your tasks")
			} else {
				this.initialPage = false;
				this.createTaskPage = false;
				this.checkTasksPage = true;
			}
		},

		delete_task(key) {
			delete this.taskList[key];
		},

		save_data() {
			let taskListEncoded = JSON.stringify(this.taskList);
			localStorage.setItem(this.userName, taskListEncoded);
			this.move_initialPage();
		},

		delete_data() {
			let userTaskList = localStorage.getItem(this.userName);
			if (userTaskList === null) {
				alert("No data in local storage");
			} else {
				localStorage.removeItem(this.userName);
				this.taskList = {};
				this.move_initialPage();
			}
		},

		new_taskList() {
			if (this.userName === "") {
				alert("Please input your name");
			} else {
				this.move_createTasksPage();
			}
		},

		login_taskList() {
			let taskListEncoded = localStorage.getItem(this.userName);
			if (taskListEncoded === null) {
				alert("Your data is None");
			} else {
				let taskListDecoded = JSON.parse(taskListEncoded);
				this.taskList = taskListDecoded;
				this.move_checkTasksPage();
			}
		}

	}
})

app.mount('#app')