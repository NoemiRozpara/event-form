function StateStore (){
    this.state = {}
}

var AppState = new StateStore()
AppState.state = {
	apiUrl: 'http://localhost:3000/data/categories.json'
}

export default AppState; 