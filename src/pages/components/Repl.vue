<template>
  <div>
   <div id="terminal"></div>
  </div>
</template>

<script>
import Terminal from "xterm";

export default {
  name: "error",
  data() {
    return {
        term: null
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      term = new Terminal();
      term.open(document.getElementById("terminal"));
      term.write("Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ");
      term.on("data", function(data) {
        term.write(data);
      });
    });
  }
};
</script>
