"use client";
/* eslint-disable */

// import React from "react";
// import { Montserrat } from "next/font/google";

// const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "700"], // you can add weights you need
// });
import "../project/Project.css";
const page = () => {
  let allowBalls = 0;
  const MoveTextRight = () => {
    allowBalls = (allowBalls + 1) % 4;
    updateTextWitBalls();
  };
  const MoveTextLeft = () => {
    allowBalls = (allowBalls - 1 + 4) % 4;
    updateViewBarLogo();
  };
  const updateTextWitBalls = () => {
    const elementsBalss = [
      document.getElementById("Number1"),
      document.getElementById("Number2"),
      document.getElementById("Number3"),
      document.getElementById("Number4"),
    ];
    const elementsText = [
      document.getElementById("text1"),
      document.getElementById("text2"),
      document.getElementById("text3"),
      document.getElementById("text4"),
    ];

    elementsBalss.forEach((el, index) => {
      if (!el) return;
      if (index === allowBalls) {
        el.classList.remove("hidden");
        el.classList.add("flex");
      } else {
        el.classList.add("hidden");
        el.classList.remove("flex");
      }
    });
    elementsText.forEach((el, index) => {
      if (!el) return;
      if (index === allowBalls) {
        el.classList.remove("hidden");
        el.classList.add("flex");
      } else {
        el.classList.add("hidden");
        el.classList.remove("flex");
      }
    });
  };
  const updateViewBarLogo = () => {
    const elements = [
      document.getElementById("BarLogo1"),
      document.getElementById("BarLogo2"),
      document.getElementById("BarLogo3"),
      document.getElementById("BarLogo4"),
    ];

    elements.forEach((el, index) => {
      if (!el) return;
      if (index === allowForBarLogo) {
        el.classList.remove("hidden");
        el.classList.add("flex");
      } else {
        el.classList.add("hidden");
        el.classList.remove("flex");
      }
    });
  };
  let allowForBarLogo = 0;

  const MoveIconleft = () => {
    allowForBarLogo = (allowForBarLogo + 1) % 4;
    updateViewBarLogo();
  };
  const MoveIconright = () => {
    allowForBarLogo = (allowForBarLogo - 1 + 4) % 4;
    updateViewBarLogo();
  };
  const updateViewForCards = () => {
    const elements = [
      document.getElementById("Card1"),
      document.getElementById("Card2"),
      document.getElementById("Card3"),
      document.getElementById("Card4"),
    ];

    elements.forEach((el, index) => {
      if (!el) return;
      if (index === allowForCard) {
        el.classList.remove("hidden");
        el.classList.add("flex");
      } else {
        el.classList.add("hidden");
        el.classList.remove("flex");
      }
    });
  };
  let allowForCard = 0;

  const MoveCardleft = () => {
    allowForCard = (allowForCard + 1) % 4;
    updateViewForCards();
  };
  const MoveCardright = () => {
    allowForCard = (allowForCard - 1 + 4) % 4;
    updateViewForCards();
  };
  let allow = 0;

  const updateView = () => {
    const elements = [
      document.getElementById("move"),
      document.getElementById("move2"),
      document.getElementById("move3"),
    ];

    elements.forEach((el, index) => {
      if (!el) return;
      if (index === allow) {
        el.classList.remove("hidden");
        el.classList.add("flex");
      } else {
        el.classList.add("hidden");
        el.classList.remove("flex");
      }
    });
  };

  const moveLeft = () => {
    allow = (allow + 1) % 3;
    updateView();
  };

  const moveright = () => {
    allow = (allow - 1 + 3) % 3;
    updateView();
  };
  return (
    <div
      className={` xl:bg-mycolor bg-mycolor md:bg-mycolor lg:bg-mycolorpt-[3.125rem] lg:pt-[2.222rem] md:pt-[1.667rem] xl:pt-[3.125rem]   lg:px-[3.733rem] md:px-[2.8rem] xl:px-[5.25rem] px-[1.563rem] `}
    >
      <header>
        {/* part 1 : /  */}
        {/* for desktop  */}
        <nav className="md:flex lg:flex xl:flex justify-between items-center content-center w-full hidden ">
          <div className=" flex gap-[0.938rem] lg:gap-[0.667rem] md:gap-[0.5rem] xl:gap-[0.938rem] items-center ">
            <img
              className="w-[6.375rem] lg:w-[4.533rem] md:w-[3.4rem] xl:w-[6.375rem] h-[6.438rem] lg:h-[4.578rem] md:h-[3.434rem] xl:h-[6.438rem]
         "
              src="/assets/logo.svg"
            />
            <img
              src="/assets/Frame.png"
              className="w-[4.75rem] lg:w-[3.378rem] md:w-[2.533rem] xl:w-[4.75rem] h-[2.875rem] lg:h-[2.044rem] md:h-[1.533rem] xl:h-[2.875rem]"
            />
          </div>
          <div className=" flex  text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] gap-[2.625rem] lg:gap-[1.867rem] md:gap-[1.4rem] xl:gap-[2.625rem] ">
            <a
              href="/ABOUT"
              className=" cursor-pointer hover:text-gray-600 z-50  text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem]  text-white font-bold
         "
            >
              ABOUT
            </a>
            <a
              href="/SERVICES"
              className=" cursor-pointer hover:text-gray-600 z-50  text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem]  text-white font-bold
         "
            >
              SERVICES
            </a>
            <a
              href="/TECHNOLOGIES"
              className=" cursor-pointer hover:text-gray-600 z-50  text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem]  text-white font-bold
         "
            >
              TECHNOLOGIES
            </a>
            <a
              href="/HOWTO
"
              className=" cursor-pointer hover:text-gray-600 z-50 text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem]   text-white font-bold"
            >
              HOW TO
            </a>
          </div>
          <div className=" flex gap-[2.375rem] lg:gap-[1.689rem] md:gap-[1.267rem] xl:gap-[2.375rem] ">
            <button className="cursor-pointer z-50 hover:bg-slate-400  text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] h-[3rem] lg:h-[2.133rem] md:h-[1.6rem] xl:h-[3rem] border-white border text-white font-bold">
              CONTACT US
            </button>
            <button
              className="cursor-pointer z-50 hover:bg-violet-400 hover:text-white hover:bg-none  bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma  text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] h-[3rem] lg:h-[2.133rem] md:h-[1.6rem] xl:h-[3rem] font-bold
         "
            >
              JOIN HYDRA
            </button>
          </div>
        </nav>
        {/* for desktop  */}
        {/* for mobile  */}
        <nav className="flex md:hidden lg:hidden xl:hidden w-full justify-between">
          <div className="flex gap-[0.688rem]">
            {" "}
            <img
              className="w-[4.313rem]  h-[3.743rem] mt-[1.604rem]
         "
              src="/assets/logo.svg"
            />
            <img
              src="/assets/Frame.png"
              className="w-[2.875rem]  h-[1.75rem] mt-[3.25rem]"
            />
          </div>
          <div>
            <img
              src="/assets/mobileNavButton.png"
              className="w-[2.063rem]  h-[1.625rem] mt-[3.313rem]"
            />
          </div>
        </nav>

        {/* part 1 : /  */}
        {/* part 2 : /  */}

        <div className="xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2  grid grid-cols-1  text-white">
          <div className="xl:order-1 md:order-1  lg:order-1  order-2  mt-[2.491rem] lg:mt-[6.489rem] md:mt-[4.867rem] xl:mt-[9.125rem]  ">
            <div className="flex flex-col">
              <div className="flex items-center mx-auto md:mx-0 lg:mx-0 xl:mx-0 z-30">
                <span className="text-[2.25rem]  lg:text-[2.044rem] md:text-[1.533rem] xl:text-[2.875rem] font-bold ">
                  Dive&nbsp;
                </span>
                <span className="text-[1.5rem] lg:text-[1.778rem] md:text-[1.333rem] xl:text-[2.5rem] font-bold">
                  {" "}
                  Into The Depths
                </span>
              </div>

              <div className="leading-6 mx-auto md:mx-0 lg:mx-0 xl:mx-0 z-30">
                <span className="text-[1.5rem] lg:text-[1.778rem] md:text-[1.333rem] xl:text-[2.5rem] font-bold">
                  {" "}
                  Of{" "}
                </span>
                <span className="text-[2rem] lg:text-[2.044rem] md:text-[1.533rem] xl:text-[2.875rem] font-bold">
                  Virtual Reality
                </span>
                <p className="max-w-[28.125rem] lg:w-[20rem] md:w-[15rem] xl:w-[28.125rem] mt-[2.25rem] lg:mt-[1.6rem] md:mt-[1.2rem] xl:mt-[2.25rem] hidden md:flex lg:flex xl:flex">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore nisl
                  tincidunt eget. Lectus mauris eros in vitae .
                </p>
              </div>
              <div className="mt-[2.25rem] lg:mt-[2.933rem] md:mt-[2.2rem] xl:mt-[4.125rem] flex gap-[2.511rem] lg:gap-[1.786rem] md:gap-[1.339rem] xl:gap-[2.511rem]   items-center">
                <button className="cursor-pointer z-50  hover:bg-violet-400 hover:text-white hover:bg-none  rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] w-full lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] h-[3.25rem] lg:h-[2.133rem] md:h-[1.6rem] xl:h-[3rem]  bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma font-bold text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] mx-[1.5rem] md:mx-0 lg:mx-0 xl:mx-0 ">
                  BUILD YOUR WORLD
                </button>
                <img
                  className="hidden md:flex lg:flex xl:flex"
                  src="/assets/ARROw.svg"
                  alt="ARROw "
                />
              </div>
            </div>
          </div>

          {/* part 2 : / */}
          <div className="flex justify-center lg:justify-end xl:justify-end md:justify-end lg:order-2 xl:order-2 md:order-2   order-1 ">
            <img
              src="/assets/hero.png"
              alt="hero"
              className="h-[17.315rem] lg:h-[18.933rem] md:h-[14.2rem] xl:h-[26.625rem] w-[19.917rem] lg:w-[21.777rem] md:w-[16.333rem] xl:w-[30.625rem] mt-[3.598rem] lg:mt-[5.511rem] md:mt-[4.133rem] xl:mt-[7.75rem]  lg:mr-[0.8rem] md:mr-[0.6rem] xl:mr-[1.125rem]  z-50"
            />
            <img
              src="/assets/backgroundStyle.png"
              alt="hero"
              className=" md:w-full md:absolute md:top-0 md:left-0 md:z-10  xl:w-full  xl:absolute  xl:top-0  xl:left-0 xl:z-10 lg:w-full lg:absolute lg:top-0 lg:left-0 lg:z-10 scale-[2] md:scale-100 lg:scale-100 xl:scale-100  absolute top-[35%] right-[50%]"
            />
            <img
              src="/assets/heroBack.png"
              alt="hero"
              className="h-[18.5rem] lg:h-[20.222rem] md:h-[15.167rem] xl:h-[28.438rem] w-[21.25rem] lg:w-[23.289rem] md:w-[17.467rem] xl:w-[32.75rem] mt-[3.028rem] lg:mt-[4.978rem] md:mt-[3.733rem] xl:mt-[7rem] absolute"
            />
          </div>
        </div>
      </header>
      {/* part 2 : /  */}
      {/* 3eme // */}
      {/* indesktop  */}
      <div className="hidden xl:flex lg:flex md:flex xl:flex-col lg:flex-col md:flex-col">
        <section className="mt-[5.5rem] lg:mt-[3.911rem] md:mt-[2.933rem] xl:mt-[5.5rem] flex text-white">
          <div className="w-full rounded-[5.625rem] lg:rounded-[4rem] md:rounded-[3rem] xl:rounded-[5.625rem] bg-[radial-gradient(circle,_theme(colors.radialform),_theme(colors.radialto))] h-[10.438rem] lg:h-[7.422rem] md:h-[5.567rem] xl:h-[10.438rem] flex flex-row content-center">
            <div className="h-[7.281rem] lg:h-[5.178rem] md:h-[3.883rem] xl:h-[7.281rem] pt-[1.75rem] lg:pt-[1.244rem] md:pt-[0.933rem] xl:pt-[1.75rem] mt-[1.625rem] lg:mt-[1.156rem] md:mt-[0.867rem] xl:mt-[1.625rem] flex ">
              <img
                src="/assets/location.svg"
                alt="icon1"
                className="w-[4.375rem] lg:w-[3.111rem] md:w-[2.333rem] xl:w-[4.375rem] h-[4.375rem] lg:h-[3.111rem] md:h-[2.333rem] xl:h-[4.375rem] ml-[2.438rem] lg:ml-[1.734rem] md:ml-[1.3rem] xl:ml-[2.438rem]"
              />
              <div className="flex flex-col">
                <h3 className="font-bold text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem]">
                  {" "}
                  Pay Us a Visit
                </h3>
                <p
                  className="text-[0.875rem] lg:text-[0.622rem] md:text-[0.467rem] xl:text-[0.875rem]
  mt-[0.625rem] lg:mt-[0.444rem] md:mt-[0.333rem] xl:mt-[0.625rem]"
                >
                  Union St, Seattle, WA 98101, United States
                </p>
              </div>
            </div>
            <div className=" ml-[2.656rem] lg:ml-[1.889rem] md:ml-[1.417rem] xl:ml-[2.656rem] justify-center h-[7.281rem] lg:h-[5.178rem] md:h-[3.883rem] xl:h-[7.281rem] w-[23.156rem] lg:w-[16.466rem] md:w-[12.35rem] xl:w-[23.156rem] pt-[1.75rem] lg:pt-[1.244rem] md:pt-[0.933rem] xl:pt-[1.75rem] mt-[1.625rem] lg:mt-[1.156rem] md:mt-[0.867rem] xl:mt-[1.625rem] flex border border-y-0 ">
              <img
                src="/assets/call.svg"
                alt="icon2"
                className="w-[4.375rem] lg:w-[3.111rem] md:w-[2.333rem] xl:w-[4.375rem] h-[4.375rem] lg:h-[3.111rem] md:h-[2.333rem] xl:h-[4.375rem] mr-[1.813rem] lg:mr-[1.289rem] md:mr-[0.967rem] xl:mr-[1.813rem]"
              />
              <div className="flex flex-col">
                <h3 className="font-bold text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem]">
                  {" "}
                  Give Us a Call
                </h3>
                <p className="text-[0.875rem] lg:text-[0.622rem] md:text-[0.467rem] xl:text-[0.875rem] mt-[0.625rem] lg:mt-[0.444rem] md:mt-[0.333rem] xl:mt-[0.625rem]">
                  (110) 1111-1010
                </p>
              </div>
            </div>

            <div className=" ml-[3.125rem] lg:ml-[2.222rem] md:ml-[1.667rem] xl:ml-[3.125rem] h-[7.281rem] lg:h-[5.178rem] md:h-[3.883rem] xl:h-[7.281rem] pt-[1.75rem] lg:pt-[1.244rem] md:pt-[0.933rem] xl:pt-[1.75rem] mt-[1.625rem] lg:mt-[1.156rem] md:mt-[0.867rem] xl:mt-[1.625rem] flex ">
              <img
                src="/assets/shape.svg"
                alt="icon3"
                className="w-[4.375rem] lg:w-[3.111rem] md:w-[2.333rem] xl:w-[4.375rem] h-[4.375rem] lg:h-[3.111rem] md:h-[2.333rem] xl:h-[4.375rem] mr-[1.813rem] lg:mr-[1.289rem] md:mr-[0.967rem] xl:mr-[1.813rem] "
              />
              <div className="flex flex-col">
                <h3 className="font-bold text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem]">
                  Send Us a Message
                </h3>
                <p className="text-[0.875rem] lg:text-[0.622rem] md:text-[0.467rem] xl:text-[0.875rem]  mt-[0.625rem] lg:mt-[0.444rem] md:mt-[0.333rem] xl:mt-[0.625rem]">
                  Contact@HydraVTech.com
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* 3eme // */}
        {/* 4eme // */}
        <div className="grid-cols-2 grid  text-white ">
          <div className="mt-[5.625rem] lg:mt-[4rem] md:mt-[3rem] xl:mt-[5.625rem]  ">
            <h1 className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] font-bold">
              INTRODUCTION{" "}
            </h1>
            <div className="flex ">
              <span className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] h-0 font-light">
                TO HYDRA VR
              </span>
              <img
                className="ml-[1.875rem] lg:ml-[1.333rem] md:ml-[1rem] xl:ml-[1.875rem]  -mt-[1.563rem] lg:-mt-[1.111rem] md:-mt-[0.834rem] xl:-mt-[1.563rem]"
                src="/assets/longArrow.svg "
                alt="longArrow"
              />
              <img
                src="/assets/stylingbackgournd2.png"
                alt="hero"
                className=" md:w-full md:z-0 z-0 xl:z-0 lg:z-0  md:absolute md:top-[170%] md:left-0  xl:w-full  xl:absolute  xl:top-[170%]  xl:left-0  lg:w-full lg:absolute lg:top-[150%] lg:left-0  scale-[2] md:scale-100 lg:scale-100 xl:scale-100  absolute top-[170%] right-[50%]"
              />
            </div>
            <div className="">
              <img
                className="w-[32.75rem] relative  z-50 md:z-50 lg:z-50 xl:z-50 lg:w-[23.289rem] md:w-[17.467rem] xl:w-[32.75rem] h-[34.813rem] lg:h-[24.756rem] md:h-[18.567rem] xl:h-[34.813rem] mt-[4.188rem] lg:mt-[2.978rem] md:mt-[2.234rem] xl:mt-[4.188rem]"
                src="/assets/secton2.png"
                alt="image-Section-2"
              />
            </div>
            <h1 className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] font-bold mt-[6.875rem] lg:mt-[4.889rem] md:mt-[3.667rem] xl:mt-[6.875rem]">
              WHY BUILD{" "}
            </h1>
            <div className="flex ">
              <span className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] h-0 font-light">
                WITH HYDRA?
              </span>
              <img
                className="ml-[1.875rem] lg:ml-[1.333rem] md:ml-[1rem] xl:ml-[1.875rem]  -mt-[1.563rem] lg:-mt-[1.111rem] md:-mt-[0.834rem] xl:-mt-[1.563rem]"
                src="/assets/longArrow.svg "
                alt="longArrow"
              />
            </div>
          </div>
          {/* middle: */}
          <div className="mt-[5.625rem] lg:mt-[4rem] md:mt-[3rem] xl:mt-[5.625rem]">
            <p className="text-[1rem] lg:text-[0.711rem] md:text-[0.533rem] xl:text-[1rem]  w-[40.625rem] lg:w-[28.888rem] md:w-[21.667rem] xl:w-[40.625rem] font-light  ">
              Vitae sapien pellentesque habitant morbi tristique senectus et
              netus et. Feugiat nibh sed pulvinar proin gravida hendrerit
              lectus. Mi sit amet mauris commodo quis imperdiet massa tincidunt
              nunc. Viverra aliquet eget sit amet tellus. Ornare lectus sit amet
              est placerat in. Lectus magna fringilla urna porttitor rhoncus
              vitae.
            </p>
            <h1 className="mt-[9.438rem] lg:mt-[6.711rem] md:mt-[5.034rem] xl:mt-[9.438rem] font-bold text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem]">
              ABOUT
            </h1>
            <h1 className="font-light text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] ">
              HYDRA VR
            </h1>
            <p className="mt-[2.625rem] lg:mt-[1.867rem] md:mt-[1.4rem] xl:mt-[2.625rem] leading-loose  w-[40.625rem] lg:w-[28.888rem] md:w-[21.667rem] xl:w-[40.625rem]">
              Eget mi proin sed libero enim sed faucibus turpis. Nisl rhoncus
              mattis rhoncus urna neque viverra justo. Vivamus at augue eget
              arcu dictum. Ultrices gravida dictum fusce ut placerat orci.
              Aenean et tortor at risus viverra adipiscing at in. Mattis aliquam
              faucibus purus in massa. Est placerat in egestas erat imperdiet
              sed. Consequat semper viverra nam libero justo laoreet sit amet.
              Aliquam etiam erat velit scelerisque in dictum non consectetur a.
              Laoreet sit amet cursus sit amet. Vel eros donec ac odio tempor
              orci dapibus. Sem nulla pha retra diam sit amet nisl suscipit
              adipiscing bibendum. Leo a diam sollicitudi n tempor.
            </p>
            <button className="cursor-pointer z-50  hover:bg-violet-400 hover:text-white hover:bg-none text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] h-[3rem] lg:h-[2.133rem] md:h-[1.6rem] xl:h-[3rem]  bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma font-light mt-[1.75rem] lg:mt-[1.244rem] md:mt-[0.933rem] xl:mt-[1.75rem] ">
              LET’S GET IN TOUCH
            </button>
            {/* diffrent size here />//  mt-[8.588rem] lg:mt-[6.107rem] md:mt-[4.58rem] xl:mt-[8.588rem] */}
            <p className=" w-[40.625rem] lg:w-[28.888rem] md:w-[21.667rem] xl:w-[40.625rem] mt-[8.588rem] lg:mt-[6.107rem] md:mt-[4.58rem] xl:mt-[8.588rem]">
              Vitae sapien pellentesque habitant morbi tristique senectus et
              netus et. Feugiat nibh sed pulvinar proin gravida hendrerit
              lectus. Mi sit amet mauris commodo quis imperdiet massa tincidunt
              nunc. Viverra aliquet eget sit amet tellus. Ornare lectus sit amet
              est placerat in. Lectus magna fringilla urna porttitor rhoncus
              vitae.
            </p>
          </div>
        </div>
        {/* 4eme // */}
        {/* 5eme // */}
        <section>
          <div className="grid grid-cols-4   gap-[0.688rem] lg:gap-[0.489rem] md:gap-[0.367rem] xl:gap-[0.688rem] mt-[6.375rem] lg:mt-[4.533rem] md:mt-[3.4rem] xl:mt-[6.375rem]">
            {/* CarD1 / */}
            <div className="hover:shadow-white-glow transition-all duration-300  hover:border hover:border-white  bg-[radial-gradient(circle,_theme(colors.radialform),_theme(colors.radialto))]  flex flex-col rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] h-[31.938rem] lg:h-[22.711rem] md:h-[17.034rem] xl:h-[31.938rem]">
              <img
                src="/assets/card1.png"
                alt="card1"
                className=" mt-[2.34rem] lg:mt-[1.664rem] md:mt-[1.248rem] xl:mt-[2.34rem] w-[11.933rem] lg:w-[8.486rem] md:w-[6.364rem] xl:w-[11.933rem] h-[11.933rem] lg:h-[8.486rem] md:h-[6.364rem] xl:h-[11.933rem] mx-auto rounded-full "
              />
              <img
                src="/assets/CardsBack.png"
                alt="card1"
                className="  -mt-[12.8rem] lg:-mt-[9.102rem] md:-mt-[6.827rem] xl:-mt-[12.8rem]  w-[13.688rem] lg:w-[9.734rem] md:w-[7.3rem] xl:w-[13.688rem] h-[13.688rem] lg:h-[9.734rem] md:h-[7.3rem] xl:h-[13.688rem] mx-auto  "
              />
              <h1 className="mt-[1.313rem] lg:mt-[0.934rem] md:mt-[0.7rem] xl:mt-[1.313rem] text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem] mb-1.094rem] mx-auto text-white">
                SIMULATION
              </h1>
              <div className=" border-t-2 border-white w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] mx-auto"></div>
              <div className="p-[1.344rem] lg:p-[0.956rem] md:p-[0.717rem] xl:p-[1.344rem] text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] text-white">
                Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
                porttitor rhoncus libero justo laoreet sit amet vitae.
              </div>
              <button className="cursor-pointer z-50  hover:bg-violet-400 hover:text-white hover:bg-none  mx-auto mt-[0.75rem] lg:mt-[0.533rem] md:mt-[0.4rem] xl:mt-[0.75rem] text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] h-[3rem] lg:h-[2.133rem] md:h-[1.6rem] xl:h-[3rem]  bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma font-bold">
                TRY IT NOW
              </button>
            </div>
            {/* CarD2 / */}
            <div className="hover:shadow-white-glow transition-all hover:border hover:border-white bg-[radial-gradient(circle,_theme(colors.radialform),_theme(colors.radialto))]  flex flex-col rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] h-[31.938rem] lg:h-[22.711rem] md:h-[17.034rem] xl:h-[31.938rem]">
              <img
                src="/assets/card2.png"
                alt="card1"
                className="  mt-[2.34rem] lg:mt-[1.664rem] md:mt-[1.248rem] xl:mt-[2.34rem] w-[11.933rem] lg:w-[8.486rem] md:w-[6.364rem] xl:w-[11.933rem] h-[11.933rem] lg:h-[8.486rem] md:h-[6.364rem] xl:h-[11.933rem] mx-auto rounded-full "
              />
              <img
                src="/assets/CardsBack.png"
                alt="card1"
                className="  -mt-[12.8rem] lg:-mt-[9.102rem] md:-mt-[6.827rem] xl:-mt-[12.8rem]  w-[13.688rem] lg:w-[9.734rem] md:w-[7.3rem] xl:w-[13.688rem] h-[13.688rem] lg:h-[9.734rem] md:h-[7.3rem] xl:h-[13.688rem] mx-auto  "
              />

              <h1 className="mt-[1.313rem] lg:mt-[0.934rem] md:mt-[0.7rem] xl:mt-[1.313rem] text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem] mb-1.094rem] mx-auto text-white">
                EDUCATION
              </h1>
              <div className=" border-t-2 border-white w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] mx-auto"></div>
              <div className="p-[1.344rem] lg:p-[0.956rem] md:p-[0.717rem] xl:p-[1.344rem] text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] text-white">
                Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
                porttitor rhoncus libero justo laoreet sit amet vitae.
              </div>
              <button className="cursor-pointer z-50  hover:bg-violet-400 hover:text-white hover:bg-none  mx-auto mt-[0.75rem] lg:mt-[0.533rem] md:mt-[0.4rem] xl:mt-[0.75rem] text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] h-[3rem] lg:h-[2.133rem] md:h-[1.6rem] xl:h-[3rem]  bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma font-bold">
                TRY IT NOW
              </button>
            </div>
            {/* Card3/: */}
            <div className="hover:shadow-white-glow transition-all hover:border hover:border-white bg-[radial-gradient(circle,_theme(colors.radialform),_theme(colors.radialto))]  flex flex-col rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] h-[31.938rem] lg:h-[22.711rem] md:h-[17.034rem] xl:h-[31.938rem]">
              <img
                src="/assets/card3.png"
                alt="card3"
                className=" mt-[2.34rem] lg:mt-[1.664rem] md:mt-[1.248rem] xl:mt-[2.34rem] w-[11.933rem] lg:w-[8.486rem] md:w-[6.364rem] xl:w-[11.933rem] h-[11.933rem] lg:h-[8.486rem] md:h-[6.364rem] xl:h-[11.933rem] mx-auto rounded-full "
              />
              <img
                src="/assets/CardsBack.png"
                alt="card1"
                className="  -mt-[12.8rem] lg:-mt-[9.102rem] md:-mt-[6.827rem] xl:-mt-[12.8rem]  w-[13.688rem] lg:w-[9.734rem] md:w-[7.3rem] xl:w-[13.688rem] h-[13.688rem] lg:h-[9.734rem] md:h-[7.3rem] xl:h-[13.688rem] mx-auto  "
              />
              <h1 className="mt-[1.313rem] lg:mt-[0.934rem] md:mt-[0.7rem] xl:mt-[1.313rem] text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem] mb-1.094rem] mx-auto text-white">
                SELF-CARE
              </h1>
              <div className=" border-t-2 border-white w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] mx-auto"></div>
              <div className="p-[1.344rem] lg:p-[0.956rem] md:p-[0.717rem] xl:p-[1.344rem] text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] text-white">
                Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
                porttitor rhoncus libero justo laoreet sit amet vitae.
              </div>
              <button className="cursor-pointer z-50  hover:bg-violet-400 hover:text-white hover:bg-none  mx-auto mt-[0.75rem] lg:mt-[0.533rem] md:mt-[0.4rem] xl:mt-[0.75rem] text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] h-[3rem] lg:h-[2.133rem] md:h-[1.6rem] xl:h-[3rem]  bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma font-bold">
                TRY IT NOW
              </button>
            </div>
            {/* Card4 : */}
            <div className="hover:shadow-white-glow transition-all hover:border hover:border-white bg-[radial-gradient(circle,_theme(colors.radialform),_theme(colors.radialto))]  flex flex-col rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] h-[31.938rem] lg:h-[22.711rem] md:h-[17.034rem] xl:h-[31.938rem]">
              <img
                src="/assets/card4.png"
                alt="card1"
                className=" mt-[2.34rem] lg:mt-[1.664rem] md:mt-[1.248rem] xl:mt-[2.34rem] w-[11.933rem] lg:w-[8.486rem] md:w-[6.364rem] xl:w-[11.933rem] h-[11.933rem] lg:h-[8.486rem] md:h-[6.364rem] xl:h-[11.933rem] mx-auto rounded-full "
              />
              <img
                src="/assets/CardsBack.png"
                alt="card1"
                className="  -mt-[12.8rem] lg:-mt-[9.102rem] md:-mt-[6.827rem] xl:-mt-[12.8rem]  w-[13.688rem] lg:w-[9.734rem] md:w-[7.3rem] xl:w-[13.688rem] h-[13.688rem] lg:h-[9.734rem] md:h-[7.3rem] xl:h-[13.688rem] mx-auto  "
              />
              <h1 className="mt-[1.313rem] lg:mt-[0.934rem] md:mt-[0.7rem] xl:mt-[1.313rem] text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem] mb-1.094rem] mx-auto text-white">
                OUTDOOR
              </h1>
              <div className=" border-t-2 border-white w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] mx-auto"></div>
              <div className="p-[1.344rem] lg:p-[0.956rem] md:p-[0.717rem] xl:p-[1.344rem] text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] text-white">
                Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
                porttitor rhoncus libero justo laoreet sit amet vitae.
              </div>
              <button className="cursor-pointer z-50  hover:bg-violet-400 hover:text-white hover:bg-none  mx-auto mt-[0.75rem] lg:mt-[0.533rem] md:mt-[0.4rem] xl:mt-[0.75rem] text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] w-[9.625rem] lg:w-[6.844rem] md:w-[5.133rem] xl:w-[9.625rem] h-[3rem] lg:h-[2.133rem] md:h-[1.6rem] xl:h-[3rem]  bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma font-bold">
                TRY IT NOW
              </button>
            </div>
          </div>
        </section>
        {/* 5eme // */}
        {/* 6eme // */}
        <section>
          <div className="w-full flex flex-col">
            <h1 className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] mx-auto mt-[13.875rem] lg:mt-[9.867rem] md:mt-[7.4rem] xl:mt-[13.875rem] text-white font-bold z-50">
              TECHNOLOGIES & HARDWARE
            </h1>
            <span className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] mx-auto  text-white  z-50 font-light">
              USED BY HYDRA VR.
            </span>
            <img
              className="mt-[7.125rem] lg:mt-[5.067rem] md:mt-[3.8rem] xl:mt-[7.125rem] w-[79.875rem] lg:w-[56.799rem] md:w-[42.6rem] xl:w-[79.875rem] h-[18.938rem] lg:h-[13.467rem] md:h-[10.1rem] xl:h-[18.938rem] rounded-full absolute "
              src="/assets/section3.png"
              alt="photoOFWoman"
            />
          </div>
          <div className="w-full flex justify-around mt-[9.375rem] lg:mt-[6.667rem] md:mt-[5rem] xl:mt-[9.375rem]">
            <img
              className="w-[10.875rem] lg:w-[7.733rem] md:w-[5.8rem] xl:w-[10.875rem] h-[10.875rem] lg:h-[7.733rem] md:h-[5.8rem] xl:h-[10.875rem]"
              alt=""
              src="/assets/BarLogo1.png"
            />
            <img
              className="w-[10.875rem] lg:w-[7.733rem] md:w-[5.8rem] xl:w-[10.875rem] h-[10.875rem] lg:h-[7.733rem] md:h-[5.8rem] xl:h-[10.875rem]"
              alt=""
              src="/assets/BarLogo2.png"
            />
            <img
              className="w-[10.875rem] lg:w-[7.733rem] md:w-[5.8rem] xl:w-[10.875rem] h-[10.875rem] lg:h-[7.733rem] md:h-[5.8rem] xl:h-[10.875rem]"
              alt=""
              src="/assets/BarLogo3.png"
            />
            <img
              className="w-[10.875rem] lg:w-[7.733rem] md:w-[5.8rem] xl:w-[10.875rem] h-[10.875rem] lg:h-[7.733rem] md:h-[5.8rem] xl:h-[10.875rem]"
              alt=""
              src="/assets/BarLogo4.png"
            />
          </div>
        </section>
        {/* 6eme /  */}
        {/* 7eme /  */}
        <section>
          <div className="grid grid-cols-2 ">
            <div className="flex flex-col">
              <h1 className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] font-bold mt-[4.313rem] lg:mt-[3.067rem] md:mt-[2.3rem] xl:mt-[4.313rem] text-white">
                HOW WE BUILD
              </h1>
              <div className="flex ">
                <span className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] h-0 font-light text-white">
                  WITH HYDRA VR?
                </span>
                <img
                  className="ml-[1.875rem] lg:ml-[1.333rem] md:ml-[1rem] xl:ml-[1.875rem]  -mt-[1.563rem] lg:-mt-[1.111rem] md:-mt-[0.834rem] xl:-mt-[1.563rem]"
                  src="/assets/longArrow.svg "
                  alt="longArrow"
                />
              </div>
            </div>
            <div>
              <p className="mt-[4.313rem] lg:mt-[3.067rem] md:mt-[2.3rem] xl:mt-[4.313rem] text-white">
                Vitae sapien pellentesque habitant morbi tristique senectus et
                netus et. Feugiat nibh sed pulvinar proin gravida hendrerit
                lectus. Mi sit amet mauris commodo quis imperdiet massa
                tincidunt nunc. Viverra aliquet eget sit amet tellus. Ornare
                lectus sit amet est placerat in. Lectus magna fringilla urna
                porttitor rhoncus vitae.
              </p>
            </div>
          </div>
          {/* part of balls  */}
          <div className="flex  justify-around w-full  bg-no-repeat bg-[url('/assets/lineshaped.svg')] bg-[length:79.5rem_20.438rem] xl:bg-[length:79.5rem_20.438rem] lg:bg-[length:89.5rem_12.438rem] md:bg-[length:45.5rem_11.438rem]">
            <div className="flex flex-col items-center">
              <div className="rounded-full overflow-hidden    shadow-[0_0_0_1.188rem_rgba(0,0,0,0.1)]   items-center justify-center flex flex-col text-[4rem] lg:text-[2.844rem] md:text-[2.133rem] xl:text-[4rem]   bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma w-[8.944rem] lg:w-[6.36rem] md:w-[4.77rem] xl:w-[8.944rem] h-[8.944rem] lg:h-[6.36rem] md:h-[4.77rem] xl:h-[8.944rem] mb-[1rem] mt-[5.688rem] lg:mt-[4.045rem] md:mt-[3.034rem] xl:mt-[5.688rem]">
                1
              </div>
              <div className="flex ">
                <img
                  src="assets/ARROw.svg"
                  className="mt-[0.438rem] lg:mt-[0.311rem] md:mt-[0.234rem] xl:mt-[0.438rem]"
                />
                <div className="mt-[1.563rem] lg:mt-[1.111rem] md:mt-[0.834rem] xl:mt-[1.563rem] text-white text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem] max-w-[11.688rem] lg:w-[8.311rem] md:w-[6.234rem] xl:w-[11.688rem]">
                  3D Conception & Design
                </div>
              </div>
            </div>

            {/* 2 : */}
            <div className="flex flex-col items-center">
              <div className="rounded-full items-center justify-center flex flex-col text-[4rem] lg:text-[2.844rem] md:text-[2.133rem] xl:text-[4rem]   bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma w-[8.944rem] lg:w-[6.36rem] md:w-[4.77rem] xl:w-[8.944rem] h-[8.944rem] lg:h-[6.36rem] md:h-[4.77rem] xl:h-[8.944rem] mb-[1rem] shadow-[0_0_0_1.188rem_rgba(0,0,0,0.1)] mt-[5.688rem] lg:mt-[4.045rem] md:mt-[3.034rem] xl:mt-[5.688rem]">
                2
              </div>
              <div className="flex ">
                <img
                  src="assets/ARROw.svg"
                  className="mt-[0.438rem] lg:mt-[0.311rem] md:mt-[0.234rem] xl:mt-[0.438rem]"
                />
                <div className="mt-[1.563rem] lg:mt-[1.111rem] md:mt-[0.834rem] xl:mt-[1.563rem] text-white text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem] max-w-[11.688rem] lg:w-[8.311rem] md:w-[6.234rem] xl:w-[11.688rem]">
                  Interaction Design
                </div>
              </div>
            </div>
            {/* 3: */}
            <div className="flex flex-col items-center">
              <div className="rounded-full items-center justify-center flex flex-col text-[4rem] lg:text-[2.844rem] md:text-[2.133rem] xl:text-[4rem]   bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma w-[8.944rem] lg:w-[6.36rem] md:w-[4.77rem] xl:w-[8.944rem] h-[8.944rem] lg:h-[6.36rem] md:h-[4.77rem] xl:h-[8.944rem] mb-[1rem] shadow-[0_0_0_1.188rem_rgba(0,0,0,0.1)] mt-[5.688rem] lg:mt-[4.045rem] md:mt-[3.034rem] xl:mt-[5.688rem]">
                3
              </div>
              <div className="flex ">
                <img
                  src="assets/ARROw.svg"
                  className="mt-[0.438rem] lg:mt-[0.311rem] md:mt-[0.234rem] xl:mt-[0.438rem]"
                />
                <div className="mt-[1.563rem] lg:mt-[1.111rem] md:mt-[0.834rem] xl:mt-[1.563rem] text-white text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem] max-w-[11.688rem] lg:w-[8.311rem] md:w-[6.234rem] xl:w-[11.688rem]">
                  VR World User Testing
                </div>
              </div>
            </div>
            {/* 4:/ */}
            <div className="flex flex-col items-center ">
              <div className="rounded-full items-center justify-center flex flex-col text-[4rem] lg:text-[2.844rem] md:text-[2.133rem] xl:text-[4rem]   bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma w-[8.944rem] lg:w-[6.36rem] md:w-[4.77rem] xl:w-[8.944rem] h-[8.944rem] lg:h-[6.36rem] md:h-[4.77rem] xl:h-[8.944rem] mb-[1rem] shadow-[0_0_0_1.188rem_rgba(0,0,0,0.1)] mt-[5.688rem] lg:mt-[4.045rem] md:mt-[3.034rem] xl:mt-[5.688rem]">
                4
              </div>
              <div className="flex  ">
                <img
                  src="assets/ARROw.svg"
                  className="mt-[0.438rem] lg:mt-[0.311rem] md:mt-[0.234rem] xl:mt-[0.438rem]"
                />
                <div className="mt-[1.563rem] lg:mt-[1.111rem] md:mt-[0.834rem] xl:mt-[1.563rem] text-white text-[1.5rem] lg:text-[1.067rem] md:text-[0.8rem] xl:text-[1.5rem] max-w-[11.688rem] lg:w-[8.311rem] md:w-[6.234rem] xl:w-[11.688rem]">
                  Hydra VR Deploy
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 7eme /  */}
        {/* 8eme /  */}
        <section>
          <div className=" flex flex-col mt-[7rem] lg:mt-[4.978rem] md:mt-[3.733rem] xl:mt-[7rem] w-full rounded-[6.25rem] lg:rounded-[4.444rem] md:rounded-[3.333rem] xl:rounded-[6.25rem]  bg-[radial-gradient(circle,_theme(colors.radialform),_theme(colors.radialto))] h-[63rem] lg:h-[44.799rem] md:h-[33.6rem] xl:h-[63rem] text-white items-center">
            <h1 className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] font-bold mt-[5.625rem] lg:mt-[4rem] md:mt-[3rem] xl:mt-[5.625rem] mb-[1.875rem] lg:mb-[1.333rem] md:mb-[1rem] xl:mb-[1.875rem]">
              JOIN HYDRA
            </h1>
            <div className=" border-t-2 border-white w-[25.875rem] lg:w-[18.4rem] md:w-[13.8rem] xl:w-[25.875rem] mx-auto mb-[1.313rem] lg:mb-[0.934rem] md:mb-[0.7rem] xl:mb-[1.313rem]"></div>

            <span className="text-[2.25rem] lg:text-[1.6rem] md:text-[1.2rem] xl:text-[2.25rem] font-light mb-[4.063rem] lg:mb-[2.889rem] md:mb-[2.167rem] xl:mb-[4.063rem]">
              Let’s Build Your VR Experience
            </span>

            <div className=" w-full px-[6.875rem] lg:px-[4.889rem] md:px-[3.667rem] xl:px-[6.875rem] grid grid-cols-2  gap-x-[0.625rem] lg:x-[0.444rem] md:x-[0.333rem] xl:x-[0.625rem] h-[63rem] lg:h-[44.799rem] md:h-[33.6rem] xl:h-[63rem]">
              {/* left side / */}
              <div className="">
                <input
                  placeholder="First Name"
                  className="h-[4.5rem] lg:h-[3.2rem] md:h-[2.4rem] xl:h-[4.5rem] py-[1.688rem] lg:py-[1.2rem] md:py-[0.9rem] xl:py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] lg:pl-[1.956rem] md:pl-[1.467rem] xl:pl-[2.75rem] "
                ></input>
                <input
                  placeholder="Email"
                  className="h-[4.5rem] lg:h-[3.2rem] md:h-[2.4rem] xl:h-[4.5rem] py-[1.688rem] lg:py-[1.2rem] md:py-[0.9rem] xl:py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] lg:pl-[1.956rem] md:pl-[1.467rem] xl:pl-[2.75rem] mt-[2.438rem] lg:mt-[1.734rem] md:mt-[1.3rem] xl:mt-[2.438rem]"
                ></input>
              </div>
              {/* right side / */}
              <div className="h-max">
                <input
                  placeholder="Last Name"
                  className="h-[4.5rem] lg:h-[3.2rem] md:h-[2.4rem] xl:h-[4.5rem] py-[1.688rem] lg:py-[1.2rem] md:py-[0.9rem] xl:py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] lg:pl-[1.956rem] md:pl-[1.467rem] xl:pl-[2.75rem] "
                ></input>
                <input
                  placeholder="Phone Number"
                  className="h-[4.5rem] lg:h-[3.2rem] md:h-[2.4rem] xl:h-[4.5rem] py-[1.688rem] lg:py-[1.2rem] md:py-[0.9rem] xl:py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] lg:pl-[1.956rem] md:pl-[1.467rem] xl:pl-[2.75rem] mt-[2.438rem] lg:mt-[1.734rem] md:mt-[1.3rem] xl:mt-[2.438rem]"
                ></input>
              </div>
              <div className="col-span-2  ">
                <input
                  placeholder="Phone Number"
                  className="h-[4.5rem] lg:h-[3.2rem] md:h-[2.4rem] xl:h-[4.5rem] py-[1.688rem] lg:py-[1.2rem] md:py-[0.9rem] xl:py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] lg:pl-[1.956rem] md:pl-[1.467rem] xl:pl-[2.75rem] "
                ></input>
                <textarea
                  className="h-[13.125rem] lg:h-[9.333rem] md:h-[7rem] xl:h-[13.125rem] py-[1.688rem] lg:py-[1.2rem] md:py-[0.9rem] xl:py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] lg:pl-[1.956rem] md:pl-[1.467rem] xl:pl-[2.75rem] mt-[2.438rem] lg:mt-[1.734rem] md:mt-[1.3rem] xl:mt-[2.438rem] resize-none mb-[3.188rem] lg:mb-[2.267rem] md:mb-[1.7rem] xl:mb-[3.188rem]"
                  placeholder="Tell Us Something..."
                ></textarea>
                <button className="cursor-pointer z-50  hover:bg-violet-400 hover:text-white hover:bg-none  text-[0.75rem] lg:text-[0.533rem] md:text-[0.4rem] xl:text-[0.75rem] rounded-[2.5rem] lg:rounded-[1.778rem] md:rounded-[1.333rem] xl:rounded-[2.5rem] w-[13.375rem] lg:w-[9.511rem] md:w-[7.133rem] xl:w-[13.375rem] h-[3rem] lg:h-[2.133rem] md:h-[1.6rem] xl:h-[3rem]   bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma mx-auto flex justify-center items-center">
                  SEND TO HYDRA
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* 7eme /  */}
        {/* 8eme /  */}
        <footer>
          {/* 1st / */}

          <div className="bg-[position:-260px_-53px]  bg-[url('/assets/stylingbackgournd2.png')]  bg-[length:79.5rem_20.438rem] xl:bg-[length:105.5rem _15.438rem] lg:bg-[length:89.5rem_12.438rem] md:bg-[length:99.5rem_12.438rem] w-[79.375rem] lg:w-[56.444rem] md:w-[42.333rem] xl:w-[79.375rem]  flex justify-around mt-[7.656rem] lg:mt-[5.444rem] md:mt-[4.083rem] xl:mt-[7.656rem]">
            <div>
              <img
                src="/assets/logo.svg"
                className="w-[11.563rem] lg:w-[8.222rem] md:w-[6.167rem] xl:w-[11.563rem] h-[11.563rem] lg:h-[8.222rem] md:h-[6.167rem] xl:h-[11.563rem]"
                alt=""
              />
            </div>
            {/* 2eme / */}

            <div className=" flex flex-col justify-between h-[12rem] lg:h-[8.533rem] md:h-[6.4rem] xl:h-[12rem] ">
              <a href="/ABOUT" className="text-white  ">
                ABOUT
              </a>
              <a href="/SERVICES" className="text-white  ">
                SERVICES
              </a>
              <a href="/TECHNOLOGIES" className="text-white ">
                TECHNOLOGIES
              </a>
              <a href="/HOWTOJOIN" className="text-white ">
                HOW TO JOIN HYDRA
              </a>
            </div>
            {/* 3eme / */}
            <div className=" flex flex-col justify-between h-[12rem] lg:h-[8.533rem] md:h-[6.4rem] xl:h-[12rem] ">
              <a href="/ABOUT" className="text-white ">
                F.A.Q
              </a>
              <a href="/SERVICES" className="text-white ">
                SITEMAP
              </a>
              <a href="/TECHNOLOGIES" className="text-white ">
                CONDITIONS
              </a>
              <a href="/HOWTOJOIN" className="text-white ">
                LICENSES
              </a>
            </div>
            {/* 4eme / */}
            <div className=" flex flex-col justify-between h-[12rem] lg:h-[8.533rem] md:h-[6.4rem] xl:h-[12rem] ">
              <h1 className="text-white font-bold ">SOCIALIZE WITH HYDRA</h1>
              <div className="flex">
                <img
                  src="assets/facebook.svg"
                  alt=""
                  className=" hover:bg-violet-400 hover:scale-125 hover:rounded-full cursor-pointer w-[2rem] lg:w-[1.422rem] md:w-[1.067rem] xl:w-[2rem] h-[2rem] lg:h-[1.422rem] md:h-[1.067rem] xl:h-[2rem] m-[0.625rem] lg:m-[0.444rem] md:m-[0.333rem] xl:m-[0.625rem]"
                />
                <img
                  src="assets/twitter.svg"
                  alt=""
                  className=" hover:bg-violet-400 hover:scale-125 hover:rounded-full cursor-pointer w-[2rem] lg:w-[1.422rem] md:w-[1.067rem] xl:w-[2rem] h-[2rem] lg:h-[1.422rem] md:h-[1.067rem] xl:h-[2rem] m-[0.625rem] lg:m-[0.444rem] md:m-[0.333rem] xl:m-[0.625rem]"
                />
                <img
                  src="assets/linkedin.svg"
                  alt=""
                  className=" hover:bg-violet-400 hover:scale-125 hover:rounded-full cursor-pointer w-[2rem] lg:w-[1.422rem] md:w-[1.067rem] xl:w-[2rem] h-[2rem] lg:h-[1.422rem] md:h-[1.067rem] xl:h-[2rem] m-[0.625rem] lg:m-[0.444rem] md:m-[0.333rem] xl:m-[0.625rem]"
                />
                <img
                  src="assets/youtube.svg"
                  alt=""
                  className=" hover:bg-violet-400 hover:scale-125 hover:rounded-full cursor-pointer w-[2rem] lg:w-[1.422rem] md:w-[1.067rem] xl:w-[2rem] h-[2rem] lg:h-[1.422rem] md:h-[1.067rem] xl:h-[2rem] m-[0.625rem] lg:m-[0.444rem] md:m-[0.333rem] xl:m-[0.625rem]"
                />
                <img
                  src="assets/instagram.svg"
                  alt=""
                  className=" hover:bg-violet-400 hover:scale-125 hover:rounded-full cursor-pointer w-[2rem] lg:w-[1.422rem] md:w-[1.067rem] xl:w-[2rem] h-[2rem] lg:h-[1.422rem] md:h-[1.067rem] xl:h-[2rem] m-[0.625rem] lg:m-[0.444rem] md:m-[0.333rem] xl:m-[0.625rem]"
                />
                <img
                  src="assets/pinterest.svg"
                  alt=""
                  className=" hover:bg-violet-400 hover:scale-125 hover:rounded-full cursor-pointer w-[2rem] lg:w-[1.422rem] md:w-[1.067rem] xl:w-[2rem] h-[2rem] lg:h-[1.422rem] md:h-[1.067rem] xl:h-[2rem] m-[0.625rem] lg:m-[0.444rem] md:m-[0.333rem] xl:m-[0.625rem]"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full mt-[4.813rem] lg:mt-[3.423rem] md:mt-[2.567rem] xl:mt-[4.813rem] flex-col">
            <hr className="w-[79.313rem] lg:w-[56.399rem] md:w-[42.3rem] xl:w-[79.313rem]"></hr>
            <span className="text-white mt-[3.063rem] lg:mt-[2.178rem] md:mt-[1.634rem] xl:mt-[3.063rem] mb-[3.688rem] lg:mb-[2.623rem] md:mb-[1.967rem] xl:mb-[3.688rem] mx-auto">
              2023 © HYDRA LANDING PAGE - BY ZINE. E. FALOUTI - ALL RIGHTS
              RESERVED
            </span>
          </div>
        </footer>
      </div>
      {/* in mobile */}
      {/* 3eme // */}
      <div className="flex xl:hidden lg:hidden md:hidden  ">
        <section className="mt-[5.5rem]  flex text-white w-full">
          {/* the one  */}
          <div className="  w-full p-[0.547rem] rounded-[5.625rem]  bg-[radial-gradient(circle,_theme(colors.radialform),_theme(colors.radialto))] h-[6.813rem] flex items-center justify-between content-center">
            <img
              onClick={() => moveLeft()}
              src="/assets/arrowMinileft.svg"
              className="w-[1.875rem] h-[1.875rem]"
              alt=""
            />
            {/* the changing carousl */}
            <div id="move" className="flex items-center w-full h-full ">
              <img
                src="/assets/location.svg"
                alt="icon1"
                className="w-[4.375rem] ml-[0.974rem]  mr-[0.3rem] h-[4.375rem] "
              />
              <p className="text-[0.875rem] max-w-[12.188rem] ">
                Union St, Seattle, WA 98101, United States
              </p>
            </div>
            <div id="move2" className="hidden  items-center w-full h-full ">
              <img
                src="/assets/call.svg"
                alt="icon1"
                className="w-[4.375rem] ml-[0.974rem] mr-[0.7rem] h-[4.375rem] "
              />
              <p className="text-[0.875rem] max-w-[12.188rem] ">
                (110) 1111-1010
              </p>
            </div>

            <div id="move3" className="hidden  items-center w-full h-full ">
              <img
                src="/assets/shape.svg"
                alt="icon1"
                className="w-[4.375rem] ml-[0.974rem]  mr-[0.7rem] h-[4.375rem] "
              />
              <p className="text-[0.875rem] max-w-[12.188rem] ">
                Contact@HydraVTech.com{" "}
              </p>
            </div>
            {/* the changing carousl */}
            <img
              onClick={() => moveright()}
              src="/assets/arrowMiniright.svg"
              className="w-[1.875rem] h-[1.875rem]"
              alt=""
            />
          </div>
        </section>
      </div>
      {/* 3eme // */}
      {/* 4eme // */}

      <section className="text-white flex xl:hidden lg:hidden md:hidden">
        <div className="mt-[3.688rem] w-full flex flex-col  items-center">
          <h1 className="text-[1.625rem]  font-bold">INTRODUCTION </h1>
          <h2 className="text-[1.625rem] mt-[1rem]  font-light">
            TO HYDRA VR{" "}
          </h2>
          <img
            className="w-[21.049rem]  h-[22.375rem]  mt-[2.25rem]"
            src="/assets/secton2.png"
            alt="image-Section-2"
          />
          <p className="mt-[3.188rem] text-[0.75rem]  leading-loose  ">
            Eget mi proin sed libero enim sed faucibus turpis. Nisl rhoncus
            mattis rhoncus urna neque viverra justo. Vivamus at augue eget arcu
            dictum. Ultrices gravida dictum fusce ut placerat orci. Aenean et
            tortor at risus viverra adipiscing at in. Mattis aliquam faucibus
            purus in massa. Est placerat in egestas erat imperdiet sed.
            Consequat semper viverra nam libero justo laoreet sit amet. Aliquam
            etiam erat velit scelerisque in dictum non consectetur a. Laoreet
            sit amet cursus sit amet. Vel eros donec ac odio tempor orci
            dapibus. Sem nulla pha retra diam sit amet nisl suscipit adipiscing
            bibendum. Leo a diam sollicitudi n tempor.
          </p>
          <button className="cursor-pointer z-50 hover:bg-slate-400  text-[0.875rem]  rounded-[2.5rem] w-[17.25rem]  h-[3.5rem]  border-white border text-white font-light mt-[2.125rem]  ">
            LET’S GET IN TOUCH
          </button>
          <h1 className="text-[1.625rem] mt-[3.75rem] font-bold">WHY BUILD</h1>
          <h2 className="text-[1.625rem] mt-[1rem]  font-light">
            WITH HYDRA?{" "}
          </h2>
          {/* card section / */}
          <div className=" transition-all duration-300 ease-in-out  bg-[radial-gradient(circle,_theme(colors.radialform),_theme(colors.radialto))] w-[20rem] flex flex-col justify-between rounded-[2.5rem] mt-[1.625rem]  h-[31.938rem] ">
            <div
              onClick={() => MoveCardleft()}
              className=" bg-gradient-to-r   shadow-[0_0_0_0.588rem_rgba(0,0,0,0.1)] from-purpleDark to-purpleWhite text-darkfigma absolute rounded-full w-max p-2 -ml-[1.063rem] mt-56"
            >
              {" "}
              <img
                src="/assets/Sominileft.svg"
                className="w-[1.188rem] h-[1.188rem] "
              />
            </div>
            {/* firsCard/  */}
            <div id="Card1" className="flex flex-col ">
              <img
                src="/assets/card1.png"
                alt="card1"
                className=" mt-[2.34rem]  w-[11.933rem]  h-[11.933rem]  mx-auto rounded-full "
              />
              <img
                src="/assets/CardsBack.png"
                alt="card1"
                className="  -mt-[12.8rem]  w-[13.688rem]  h-[13.688rem] mx-auto  "
              />
              <h1 className="mt-[1.313rem] text-[1.5rem]  mb-1.094rem] mx-auto text-white">
                SIMULATION
              </h1>
              <div className=" border-t-2 border-white w-[9.625rem]  mx-auto"></div>
              <div className="p-[1.344rem] text-[0.75rem]   mx-auto text-white text-center">
                Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
                porttitor rhoncus libero justo laoreet sit amet vitae.
              </div>
              <button className="cursor-pointer z-50 hover:bg-slate-400  mx-auto text-[0.75rem]  rounded-[2.5rem]  w-[9.625rem] h-[3rem]  border-white border text-white font-bold">
                TRY IT NOW
              </button>
            </div>
            {/* firsCard/  */}
            {/* secondCard/  */}
            <div id="Card2" className=" flex-col hidden">
              <img
                src="/assets/card2.png"
                alt="card2"
                className=" mt-[2.34rem]  w-[11.933rem]  h-[11.933rem]  mx-auto rounded-full "
              />
              <img
                src="/assets/CardsBack.png"
                alt="card2"
                className="  -mt-[12.8rem]  w-[13.688rem]  h-[13.688rem] mx-auto  "
              />
              <h1 className="mt-[1.313rem] text-[1.5rem]  mb-1.094rem] mx-auto text-white">
                SIMULATION
              </h1>
              <div className=" border-t-2 border-white w-[9.625rem]  mx-auto"></div>
              <div className="p-[1.344rem] text-[0.75rem]   mx-auto text-white text-center">
                Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
                porttitor rhoncus libero justo laoreet sit amet vitae.
              </div>
              <button className="cursor-pointer z-50 hover:bg-slate-400  mx-auto text-[0.75rem]  rounded-[2.5rem]  w-[9.625rem] h-[3rem]  border-white border text-white font-bold">
                TRY IT NOW
              </button>
            </div>
            {/* secondCard/  */}
            {/* thirdCard/  */}
            <div id="Card3" className=" flex-col hidden">
              <img
                src="/assets/card3.png"
                alt="card3"
                className=" mt-[2.34rem]  w-[11.933rem]  h-[11.933rem]  mx-auto rounded-full "
              />
              <img
                src="/assets/CardsBack.png"
                alt="card1"
                className="  -mt-[12.8rem]  w-[13.688rem]  h-[13.688rem] mx-auto  "
              />
              <h1 className="mt-[1.313rem] text-[1.5rem]  mb-1.094rem] mx-auto text-white">
                SIMULATION
              </h1>
              <div className=" border-t-2 border-white w-[9.625rem]  mx-auto"></div>
              <div className="p-[1.344rem] text-[0.75rem]   mx-auto text-white text-center">
                Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
                porttitor rhoncus libero justo laoreet sit amet vitae.
              </div>
              <button className="cursor-pointer z-50 hover:bg-slate-400  mx-auto text-[0.75rem]  rounded-[2.5rem]  w-[9.625rem] h-[3rem]  border-white border text-white font-bold">
                TRY IT NOW
              </button>
            </div>
            {/* thirdCard/  */}
            {/* foorthCard/  */}
            <div id="Card4" className=" flex-col hidden">
              <img
                src="/assets/card4.png"
                alt="card4"
                className=" mt-[2.34rem]  w-[11.933rem]  h-[11.933rem]  mx-auto rounded-full "
              />
              <img
                src="/assets/CardsBack.png"
                alt="card4"
                className="  -mt-[12.8rem]  w-[13.688rem]  h-[13.688rem] mx-auto  "
              />
              <h1 className="mt-[1.313rem] text-[1.5rem]  mb-1.094rem] mx-auto text-white">
                SIMULATION
              </h1>
              <div className=" border-t-2 border-white w-[9.625rem]  mx-auto"></div>
              <div className="p-[1.344rem] text-[0.75rem]   mx-auto text-white text-center">
                Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
                porttitor rhoncus libero justo laoreet sit amet vitae.
              </div>
              <button className="cursor-pointer z-50 hover:bg-slate-400  mx-auto text-[0.75rem]  rounded-[2.5rem]  w-[9.625rem] h-[3rem]  border-white border text-white font-bold">
                TRY IT NOW
              </button>
            </div>
            {/* foorthCard/  */}
            <div
              onClick={() => MoveCardright()}
              className=" bg-gradient-to-r   shadow-[0_0_0_0.588rem_rgba(0,0,0,0.1)] from-purpleDark to-purpleWhite text-darkfigma absolute rounded-full w-max p-2 mt-56 ml-[18.875rem]"
            >
              {" "}
              <img
                src="/assets/Sominirightsvg.svg"
                className="w-[1.188rem] h-[1.188rem] "
              />
            </div>
          </div>
          {/* card section / */}
          {/* cover part  */}
          <div className="w-full flex flex-col">
            <h1 className="text-[1rem]  mx-auto mt-[6.688rem]  text-white font-bold z-50">
              TECHNOLOGIES & HARDWARE
            </h1>
            <span className="text-[1.5rem]  mx-auto  text-white  z-50 font-light">
              USED BY HYDRA VR.
            </span>
            <img
              className=" w-[79.875rem] h-[10.209rem] mt-[3.5rem] rounded-full absolute left-0 "
              src="/assets/section3.png"
              alt="photoOFWoman"
            />
          </div>
          {/* cover part  */}
          {/* barIcons part  */}
          <div className="flex justify-between items-center">
            <div className="rounded-full items-center justify-center flex flex-col    bg-violet-400 w-[1.875rem]  h-[1.875rem] overflow-hidden  mr-[0.5rem]  shadow-[0_0_0_0.588rem_rgba(0,0,0,0.1)]   mt-[5.688rem] ">
              <img
                onClick={() => MoveIconleft()}
                src="/assets/Sominileft.svg"
                className="w-[1.188rem] h-[1.188rem] "
              />
            </div>
            <img
              id="BarLogo1"
              className="flex w-[16rem] mt-[4.5rem] h-[16rem] "
              alt=""
              src="/assets/BarLogo4.png"
            />
            <img
              id="BarLogo2"
              className="hidden w-[16rem] mt-[4.5rem] h-[16rem] "
              alt=""
              src="/assets/BarLogo3.png"
            />
            <img
              id="BarLogo3"
              className="hidden w-[16rem] mt-[4.5rem] h-[16rem] "
              alt=""
              src="/assets/BarLogo2.png"
            />
            <img
              id="BarLogo4"
              className="hidden w-[16rem] mt-[4.5rem] h-[16rem] "
              alt=""
              src="/assets/BarLogo1.png"
            />
            <div
              onClick={() => MoveIconright()}
              className="rounded-full items-center justify-center flex flex-col   bg-violet-400  w-[1.875rem]  h-[1.875rem]  overflow-hidden  ml-[0.5rem]  shadow-[0_0_0_0.588rem_rgba(0,0,0,0.1)]  mt-[5.688rem] "
            >
              <img
                src="/assets/Sominirightsvg.svg"
                className="w-[1.188rem] h-[1.188rem]"
              />
            </div>
          </div>
          {/* barIcons part  */}
          <h1 className="text-[1.625rem] mt-[0.75rem] font-bold">WHY BUILD</h1>
          <h2 className="text-[1.625rem] mt-[1rem]  font-light">
            WITH HYDRA?{" "}
          </h2>
          {/* partOF BallCarousal */}

          <div className="flex flex-col justify-center items-center">
            <div
              id="Number1"
              className="rounded-full items-center justify-center flex flex-col text-[4rem]   bg-violet-400 w-[9.938rem]  h-[9.938rem]  overflow-hidden    shadow-[0_0_0_1.188rem_rgba(0,0,0,0.1)]  mt-[2.313rem] "
            ></div>
            <div
              id="Number2"
              className="hidden rounded-full items-center justify-center  flex-col text-[4rem]   bg-violet-400 w-[9.938rem]  h-[9.938rem]  overflow-hidden    shadow-[0_0_0_1.188rem_rgba(0,0,0,0.1)]  mt-[2.313rem] "
            >
              2
            </div>
            <div
              id="Number3"
              className="hidden rounded-full items-center justify-center  flex-col text-[4rem]   bg-violet-400 w-[9.938rem]  h-[9.938rem]  overflow-hidden    shadow-[0_0_0_1.188rem_rgba(0,0,0,0.1)]  mt-[2.313rem] "
            >
              3
            </div>
            <div
              id="Number4"
              className="hidden rounded-full items-center justify-center  flex-col text-[4rem]   bg-violet-400 w-[9.938rem]  h-[9.938rem]  overflow-hidden    shadow-[0_0_0_1.188rem_rgba(0,0,0,0.1)]  mt-[2.313rem] "
            >
              4
            </div>

            <div className=" flex justify-between items-center  w-full">
              <div
                onClick={() => MoveTextLeft()}
                className="rounded-full absolute left-0  items-center flex flex-col justify-center   bg-violet-400  w-[1.875rem]  h-[1.875rem]  overflow-hidden   shadow-[0_0_0_0.588rem_rgba(0,0,0,0.1)]  mt-[2.688rem] ml-[1.25rem] "
              >
                <img
                  src="/assets/Sominileft.svg "
                  className="w-[1.188rem] h-[1.188rem]"
                />
              </div>
              <h1
                id="text1"
                className="text-[1.5rem] max-w-[11.688rem] my-auto mt-[2.313rem] text-center font-bold mx-auto"
              >
                3D Conception & Design
              </h1>
              <h1
                id="text2"
                className="hidden text-[1.5rem] max-w-[11.688rem] my-auto mt-[2.313rem] text-center font-bold mx-auto"
              >
                Interaction Design
              </h1>
              <h1
                id="text3"
                className="hidden text-[1.5rem] max-w-[11.688rem] my-auto mt-[2.313rem] text-center font-bold mx-auto"
              >
                VR World User Testing
              </h1>
              <h1
                id="text4"
                className="hidden text-[1.5rem] max-w-[11.688rem] my-auto mt-[2.313rem] text-center font-bold mx-auto"
              >
                Hydra VR Deploy
              </h1>

              <div className="rounded-full absolute right-0 flex flex-col items-center justify-center  bg-violet-400 w-[1.875rem]  h-[1.875rem] overflow-hidden    shadow-[0_0_0_0.588rem_rgba(0,0,0,0.1)]   mt-[2.688rem] mr-[1.25rem] ">
                <img
                  onClick={() => MoveTextRight()}
                  src="/assets/Sominirightsvg.svg"
                  className="w-[1.188rem] h-[1.188rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* formPartOnMobile  */}
      <section className="flex xl:hidden lg:hidden md:hidden">
        <div className=" flex flex-col mt-[5.063rem]  w-full rounded-[6.25rem]  bg-[radial-gradient(circle,_theme(colors.radialform),_theme(colors.radialto))] h-[63rem]  text-white items-center">
          <h1 className="text-[1.5rem] font-bold mt-[2.813rem] mb-[1.313rem] ">
            JOIN HYDRA
          </h1>
          <div className=" border-t-[0.1rem] border-white w-[7.281rem]  mx-auto mb-[1.188rem] "></div>

          <span className="text-[1.5rem] font-light mb-[2.25rem] text-center ">
            Let’s Build
            <br></br>
            Your VR Experience
          </span>

          <div className=" w-full px-[1.313rem]  grid grid-cols-1  gap-y-[1.375rem]  h-[3.313rem] ">
            <input
              placeholder="First Name"
              className="h-[3.313rem] text-[0.875rem]  py-[1.813rem]w-full rounded-3xl border border-white pl-[2.75rem]  "
            ></input>
            <input
              placeholder="Email"
              className="h-[3.313rem] text-[0.875rem]  py-[1.813rem]w-full rounded-3xl border border-white pl-[2.75rem] "
            ></input>

            <input
              placeholder="Last Name"
              className="h-[3.313rem] text-[0.875rem]  py-[1.813rem]  w-full rounded-3xl border border-white pl-[2.75rem]  "
            ></input>
            <input
              placeholder="Phone Number"
              className="h-[3.313rem] text-[0.875rem]  py-[1.813rem]  w-full rounded-3xl border border-white pl-[2.75rem] "
            ></input>

            <input
              placeholder="Phone Number"
              className="h-[3.313rem] text-[0.875rem]  py-[1.813rem]  w-full rounded-3xl border border-white pl-[2.75rem]  "
            ></input>
            <textarea
              className="h-[13.688rem] text-[0.875rem]] py-[1.813rem]  w-full rounded-3xl border border-white pl-[2.75rem]  resize-none mb-[3.25rem] "
              placeholder="Tell Us Something..."
            ></textarea>
            <button className="cursor-pointer z-50   text-[0.75rem] rounded-[2.5rem] w-[13.375rem]  h-[3rem]   bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma font-bold  mx-auto flex justify-center items-center">
              SEND TO HYDRA
            </button>
          </div>
        </div>
      </section>

      {/* formPartOnMobile  */}

      {/* final section mobile  */}
      <section className="flex flex-col justify-center items-center mt-[5.063rem]  xl:hidden lg:hidden md:hidden">
        <img
          className="w-[11.563rem] h-[11.563rem] 
         "
          src="/assets/logo.svg"
        />
        <h1 className="text-[1rem]  mx-auto mt-[3.5rem] mb-[1.813rem] text-white font-bold z-50">
          SOCIALIZE WITH HYDRA{" "}
        </h1>

        <div className="flex">
          <img
            src="assets/facebook.svg"
            alt=""
            className="w-[2rem]  h-[2rem] lg:h-[1.422rem] md:h-[1.067rem] xl:h-[2rem] m-[0.625rem] lg:m-[0.444rem] md:m-[0.333rem] xl:m-[0.625rem]"
          />
          <img
            src="assets/twitter.svg"
            alt=""
            className="w-[2rem]  h-[2rem]  m-[0.625rem] "
          />
          <img
            src="assets/linkedin.svg"
            alt=""
            className="w-[2rem]  h-[2rem]  m-[0.625rem] "
          />
          <img
            src="assets/youtube.svg"
            alt=""
            className="w-[2rem]  h-[2rem]  m-[0.625rem] "
          />
          <img
            src="assets/instagram.svg"
            alt=""
            className="w-[2rem]  h-[2rem]  m-[0.625rem] "
          />
          <img
            src="assets/pinterest.svg"
            alt=""
            className="w-[2rem]  h-[2rem]  m-[0.625rem] "
          />
        </div>
        <button className="cursor-pointer z-50   rounded-[2.5rem] w-full mt-[2.938rem] mb-[3.813rem]  h-[3.25rem]    bg-gradient-to-r from-purpleDark to-purpleWhite text-darkfigma font-bold  mx-[1.5rem]  ">
          BUILD YOUR WORLD
        </button>
        <div className=" border-t-[0.1rem] border-white w-[18.063rem]  mx-auto mb-[2.375rem] "></div>
        <h4 className="max-w-[17.125rem] mb-[5.563rem] font-bold text-[0.875rem] text-center text-white leading-7">
          2023 © HYDRA LANDING PAGE
          <br></br> BY ZINE. E. FALOUTI<br></br> ALL RIGHTS RESERVED
        </h4>
      </section>
    </div>
  );
};

export default page;
