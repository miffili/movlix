<template lang="html">
  <footer>
    Ⓒ made with&nbsp;&nbsp;
    <svg class="heart" xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
<path d="M99.8968 176.067C-62.6031 131.067 18.3968 -49.4333 99.8967 55.0666C181.397 -49.4333 262.397 131.067 99.8968 176.067Z" fill="#FFE457" stroke="#F2D953" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    &nbsp;&nbsp;&amp;&nbsp;&nbsp;
    <!-- VUE svg via https://commons.wikimedia.org/wiki/File:Vue.js_Logo.svg -->
    <svg class="vue-logo" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" viewBox="70 70 280 255" height="400" width="400" xml:space="preserve" id="svg2" version="1.1" style="&#10;    /* border: 1px solid black; */&#10;"><metadata id="metadata8"><rdf:RDF><cc:Work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/></cc:Work></rdf:RDF></metadata><defs id="defs6"/><g transform="matrix(1.3333333,0,0,-1.3333333,0,400)" id="g10"><g transform="translate(178.0626,235.0086)" id="g12"><path id="path14" style="fill:#4dba87;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M 0,0 -22.669,-39.264 -45.338,0 h -75.491 L -22.669,-170.017 75.491,0 Z"/></g><g transform="translate(178.0626,235.0086)" id="g16"><path id="path18" style="fill:#435466;fill-opacity:1;fill-rule:nonzero;stroke:none" d="M 0,0 -22.669,-39.264 -45.338,0 H -81.565 L -22.669,-102.01 36.227,0 Z"/></g></g></svg>
    &nbsp;&nbsp;by&nbsp;<a href="https://github.com/Miffili" title="Klara @ Github">Klara</a>
  </footer>
</template>
<button type="button" name="button"></button>

<script>
export default {
  name: "TheFooter",
}
</script>

<style lang="css" scoped>
  footer {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 1.75rem 0.5rem;
    color: white;
    font-weight: lighter;
    background: hsla(0, 0%, 0%, 0.75);
    box-sizing: border-box;
    margin-top: 1rem;
    letter-spacing: 0.1rem;
    font-size: 0.8rem;
    cursor: default;
    position: absolute;
    bottom: 0;
    line-height: 1.25rem;
  }
  .vue-logo, .heart {
    height: 1.2em;
    width: 1.2em;
    margin-bottom: 0.2em;
  }
  .heart {
    transform-origin: bottom;
    transform: scaleY(1.1);
  }
</style>
