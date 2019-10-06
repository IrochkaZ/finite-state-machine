class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) {
            throw Error('Error!');
        }

        this.config = config;
        this.initState = '';
        this.currentState = this.config.init;
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
            throw new Error('Error!!!');
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (this.config.states[this.currentState].transitions[event]) {
            this.previousState = this.currentState;
            this.currentState = this.config.states[this.currentState].transitions[event];
        } else {
            throw new Error('Error!!!');
        }
    }


    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.previousState = this.currentState;
        this.currentState = this.config.init;
    };
    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        const arr = Object.keys(this.config.states);
        arr.forEach(function (element) {
            return element;
        })

        return arr.forEach(function (state) {
            if (this.config.states[state].transitions[event] != undefined) {
                return state;
            }
        });
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previousState == '') {
            return false
        } else {
            this.nextState = this.currentState;
            this.currentState = this.previousState;
            this.previousState = '';
            return true;
        }
    }


    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {

    }

    /**
     * Clears transition history
     */
    clearHistory() {


    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
