class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw Error('Error');
        }

        this.config = config;
        this.initState = '';
        this.currentState = this.config.initial;
        this.transitionState = '';
        this.previousState = '';
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this.config.states[state]) {
            this.currentState = state;
            this.previousState = this.currentState;
        } else {
            throw new Error('Error');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.currentState].transitions[event] !== undefined) {
            this.previousState = this.currentState;
            this.currentState = this.config.states[this.currentState].transitions[event];
        } else {
            throw new Error('Error');
        }
    }


    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.previousState = this.currentState;
        this.currentState = this.config.initial;
    };
    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];
        var arr2= [];

        Object.keys(this.config.states).forEach((el)=>{
            arr.push(el);
        });

        if(arguments.length<1){
            return arr;
        }

        if(arguments.length > 0){
            arr2 =  arr.forEach((state)=>{
                if(this.config.states[state].transitions[event]!== undefined){
                    return state;
                }
                
                return arr2;
            });

            console.log(arr2);
        }

        return [];
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previousState !== '') {
            this.previousState = this.currentState;
            this.currentState = this.previousState;
            this.previousState = '';
            return true;
        } else { return false;}
    }


    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.transitionState !== '') {
            this.previousState = this.currentState;
            this.currentState =this.transitionState;
            this.transitionState=' ';
            return true;
        } else {return false}
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previousState='';
        this.transitionState='';
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
