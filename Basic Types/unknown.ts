function f1(a: any) {
    a.b(); // OK
}


function f2(a: unknown) {
    a.b();
    //   Object is of type 'unknown'. unable to do any operations of it
}



function safeParse(s: string): unknown {
    return JSON.parse(s);
}

// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);