export class UIBlock {
    constructor() {
        // Init private variables
        this._x = 0;
        this._y = 0;
        
        // Keep track of this block's previous position
        this._oldX = 0;
        this._oldY = 0;
        
        this._visible = true;
        
        // Needs to be set by developer
        this._displayWidth = 0;
        this._displayHeight = 0;
        
        // An array of the children
        this.children = [];

        // Current child count, used for indexing
        this.childIndex = -1;
        
        // Used to identify this as a UIBlock to another UIBlock
        this.isPosBlock = true;
    }

    set x(val) {
        // Record the current x into oldX
        this._oldX = this._x;
        this._x = val;
        this.updatePositions();
    }

    set y(val) {
        // Record the current y into oldY
        this._oldY = this._y;
        this._y = val;
        this.updatePositions();
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
    
    get displayWidth() {
        return this._displayWidth;
    }

    get displayHeight() {
        return this._displayHeight;
    }
    
    get visible() {
        return this._visible;
    }

    add(child) {
        this.childIndex++;
        // Make a note of the index inside the child
        child.childIndex = this.childIndex;
        this.children.push(child);
        this.buildList();
    }

    removeChild(child) {
        // Take the child off the array based on index
        this.children.splice(child.childIndex, 1);
        this.buildList();
        
        // Rebuild the indexes
        let len = this.children.length;
        for (let i = 0; i < len; i++) {
            this.children[i].childIndex = i;
        }
        this.childIndex = len;
    }

    buildList() {
        // Build the linked list
        let len = this.children.length;
        if (len > 1) {
            for (let i = 1; i < len; i++) {
                // Set the current child to the previous child's nextChild property
                this.children[i - 1].nextChild = this.children[i];
            }
        }
        this.children[len - 1].nextChild = null;
    }

    set visible(val) {
        if (this._visible != val) {
            this._visible = val;
            if (this.children.length > 0) {
                // Send the first child to the updateChildVisible function
                this.updateChildVisible(this.children[0], val);
            }
        }
    }

    setSize(w, h) {
        this._displayWidth = w;
        this._displayHeight = h;
    }

    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.updatePositions();
    }

    updateChildVisible(child, isVisible) {
        child.visible = isVisible;
        if (child.isPosBlock == true) {
            child.visible = isVisible;
        }
        if (child.nextChild != null) {
            // If the child has a nextChild call this function recursively
            this.updateChildVisible(child.nextChild, isVisible);
        }
    }

    updateChildPos(child) {
        child.y = child.y - this._oldY + this._y;
        child.x = child.x - this._oldX + this._x;
        if (child.isPosBlock == true) {
            child.updatePositions();
        }
        if (child.nextChild != null) {
            // If the child has a nextChild call this function recursively 
            this.updateChildPos(child.nextChild);
        }
        //set the old values to the new
        this._oldX = this._x;
        this._oldY = this._y;
    }

    updatePositions() {
        // Update the children
        if (this.children.length > 0) {
            // Send the first child to the updateChildPos function
            this.updateChildPos(this.children[0]);
        }
    }

    getRelPos(child) {
        return {
            x: child.x - this.x,
            y: child.y - this.y
        };
    }
    
}