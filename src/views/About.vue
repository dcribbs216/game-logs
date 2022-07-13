<template>
  <div id="about-container">
    <div id="about">
      <h1 id="title">About</h1>
      <div id="summary">
        <p style="tab-size=6">
          &emsp;This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          <br>
          <br>
          &emsp;This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
          This is an about page. This is an about page. This is an about page. 
        </p>
      </div>
      <div id="spec">
        <label for="spec">SPECS</label>
        <p style="tab-size=6">
          &emsp;It was built using this and that. It was built using this and that.
          It was built using this and that. It was built using this and that.
          It was built using this and that. It was built using this and that.
          <br>
          <br>
          It was built using this and that and this and that and this and that.          
          <br>
          <br>
          It was built using this and that and this and that and this.          
          <br>
          <br>
          It was built using this and that. It was built using this and that.
          and this and that and this and that. It was built using this and that.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

  *{
      font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  #about-container{
        background-image: linear-gradient(90deg, black 90%, rgba(82, 5, 112, 0.238));
  }

  #about{
    max-width: 800px;
    min-height: 730px;
    margin: 0 auto;
    padding: 20px 10px;

    /* border: 1px solid green; */
  }

  #title{
    text-align: center;
    font-size: 16pt;
    padding: 30px 0;
    letter-spacing: 2px;
    text-transform: uppercase;

  }

  #summary p{
    border-top: 1px solid grey;
    padding: 20px 0;
    font-size: 13pt;
    
  }

  label{
    display: block;
    margin-top: 40px;
    padding: 10px 0;
    font-size: 10pt;
    letter-spacing: 2px;
    border-bottom: 1px solid grey;
  }

  #spec p{
    padding: 20px 0;
    font-size: 13pt;
    
  }


</style>
