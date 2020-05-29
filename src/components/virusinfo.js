import React from "react";

const VirusInfo = () => {
  const divStyle = {
    display: "flex",
    flexDirection: 'column',
    // overflow: "scroll",
    // textAlign: 'right',
    // flexGrow: 2,
    // flexShrink: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // flexBasis: "20em",
    // margin: '3vh',
    // padding: '50vh',
    marginTop: '-113em',
    marginRight: '0.5vw',
    marginLeft: '60em',
    // padding: '20vh',
    // marginLeft: 'auto',
    // flexWrap: 'wrap',
    // position: 'fixed',
    height: '100%'
  };
  const pStyle = {
    fontSize: "18px",

  };

  return (
    <div style={divStyle} id="VirusInfo">
      <h1>Information about COVID-19 from WHO</h1>
      <ul style={pStyle}>
        <li>
          Coronavirus disease (COVID-19) is an infectious disease caused by a
          newly discovered coronavirus.
        </li>
        <li>
          Most people infected with the COVID-19 virus will experience mild to
          moderate respiratory illness and recover without requiring special
          treatment. Older people, and those with underlying medical problems
          like cardiovascular disease, diabetes, chronic respiratory disease,
          and cancer are more likely to develop serious illness.
        </li>
        <li>
          The best way to prevent and slow down transmission is be well informed
          about the COVID-19 virus, the disease it causes and how it spreads.
          Protect yourself and others from infection by washing your hands or
          using an alcohol based rub frequently and not touching your face.
        </li>
        <li>
          The COVID-19 virus spreads primarily through droplets of saliva or
          discharge from the nose when an infected person coughs or sneezes, so
          it’s important that you also practice respiratory etiquette (for
          example, by coughing into a flexed elbow).
        </li>
      </ul>
      <p style={{ textAlign: "center" }}>
        <h3>
          This video below goes into more detail. Please consider watching it.
        </h3>
      </p>
      <iframe title="corona-vid"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/BtN-goy9VOY"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default VirusInfo;
