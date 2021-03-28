const express = require("express");

const app = express();

app.get("/", (req, res) => {
  const names = [
    "Marcus Aurelius Antoninus Augustus",
    "Darth Vader",
    "Victor Michailovich Glushkov",
    "Gottfried Wilhelm von Leibniz",
    "Mao Zedong",
    "Vladimir Sergeevich Soloviov",
    "Ibn Arabi",
    "Lev Nikolayevich Tolstoy",
    "Muammar Muhammad Abu Minyar al-Gaddafi",
    "Rene Descartes",
    "Fyodor Mikhailovich Dostoyevsky",
    "Benedito de Espinosa",
  ];

  const handler = {
    get: function (target, name) {
      return name in target ? target[name] : 42;
    },
  };
  const p = new Proxy({}, handler);
  p.a = 1;
  console.log(p.a, p.b); // 1, 42

  const conditions = {
    length: [10, 20],
    starts: "M",
    contains: "Ze",
    ends: "g",
    not: {
        contains: 'ene'
    }
  };

  const filterMeta = (names, conditions) => {
    const operations = {};
    const check = (s, conditions) => {
      let valid = true;
      for (const key in conditions) {
        valid &= operations[key](s, conditions[key]);
      }
      return valid;
    };
    Object.assign(operations, {
      length: (s, v) => s.length >= v[0] && s.length <= v[1],
      contains: (s, v) => s.includes(v),
      starts: (s, v) => s.startsWith(v),
      ends: (s, v) => s.endsWith(v),
      not: (s, v) => !check(s, v),
    });
    return names.filter((s) => check(s, conditions));
  };

  const filter = (names) => {
    const result = [];
    for (let i = 0; i < names.length; i++) {
      const name = names[i];
      if (
        name.length >= 10 &&
        name.length <= 200 &&
        name.indexOf("Mich") > -1 &&
        name.indexOf("V") === 0 &&
        name.slice(-2) === "ov" &&
        !(
          name.length >= 50 &&
          name.length <= 65 &&
          name.indexOf("Abu") > -1 &&
          name.indexOf("Lev") === 0 &&
          name.slice(-3) === "iov"
        )
      )
        result.push(name);
    }
    return result;
  };
  console.log(filter(names));
  console.log(filterMeta(names, conditions));

  res.send("Hello Express app!");
});

app.listen(4000, () => {
  console.log("server started");
});
