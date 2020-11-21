export const changeprops = (json, payload) => {
  const { id, ...props } = payload;
  if (json.id === id) {
    for (let key of Object.keys(props)) {
      json[key] = props[key];
    }
    return true;
  } else {
    const { children = [] } = json;
    return children.some((child) => {
      return changeprops(child, payload);
    });
  }
};

export const search = (json, id) => {
  if (json.id === id) {
    return json;
  } else {
    const { children = [] } = json;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const target = search(child, id);
      if (target) {
        return target;
      }
    }
    return null;
  }
};

export const searchIns = (parent, id) => {
  if (parent && parent.option && parent.option.id === id) {
    return parent;
  } else {
    const { children = [] } = parent;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const target = searchIns(child, id);
      if (target) {
        return target;
      }
    }
    return null;
  }
};
