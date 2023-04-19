function identity<Type>(arg: Type): Type {
    return arg;
}

const object = { count: identity(4) };

export default object;
