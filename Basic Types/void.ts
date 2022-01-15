

function noop() {
    return;
}


// Contextual typing with a return type of void does not force functions to not return something
type voidFunc = () => void;

const f1: voidFunc = () => {
    return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
    return true;
};


const v1 = f1(); // void

const v2 = f2(); // void

const v3 = f3(); // void

// There is one other special case to be aware of, 
// when a literal function definition has a void return type, that function must not return anything.
function f2(): void {
    // @ts-expect-error
    return true;
}

const f3 = function (): void {
    // @ts-expect-error
    return true;
};