export const changeprops = (json, payload) => {
  const { id, ...props } = payload;
  console.log(json, payload)
  if (json.id === id) {
    for (let key of Object.keys(props)) {
      json[key] = props[key]
    }
    return true;
  } else {
    const { children = [] } = json;
    return children.some((child) => {
      return changeprops(child, payload);
    });
  }
};
