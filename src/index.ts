import run from "./app";

run()
  .then(() => {
    console.info("Finished executing commands");
  })
  .catch((err) => {
    console.error(err);
  });
