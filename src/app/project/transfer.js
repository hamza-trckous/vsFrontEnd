// const fs = require("fs");

// // Load your HTML content (replace with your real file if needed)
// let content = `
//  <div
//       className={" xl:bg-mycolor pt-[3.125rem]  px-[5.25rem] "}>
//       <header>
//         {/* part 1 : /  */}
//         <nav className="flex justify-between items-center content-center w-full ">
//           <div className=" flex gap-[0.938rem] items-center ">
//             <img
//               src="/assets/logo.svg"
//               className="w-[6.375rem] h-[6.438rem]
//          "
//             />
//             <img src="/assets/Frame.png" className="w-[4.75rem] h-[2.875rem]" />
//           </div>

//           <div className=" flex  text-[0.75rem] gap-[2.625rem] ">
//             <button
//               className="  text-[0.75rem]  text-white font-bold
//          ">
//               ABOUT
//             </button>
//             <button
//               className="  text-[0.75rem]  text-white font-bold
//          ">
//               SERVICES
//             </button>
//             <button
//               className="  text-[0.75rem]  text-white font-bold
//          ">
//               TECHNOLOGIES
//             </button>
//             <button className=" text-[0.75rem]   text-white font-bold">
//               HOW TO
//             </button>
//           </div>
//           <div className=" flex gap-[2.375rem] ">
//             <button
//               className=" text-[0.75rem] rounded-[2.5rem] w-[9.625rem] h-[3rem] border-white border text-white font-bold
//          ">
//               JOIN HYDRA
//             </button>
//             <button className=" text-[0.75rem] rounded-[2.5rem] w-[9.625rem] h-[3rem] border-white border text-white font-bold">
//               CONTACT US
//             </button>
//           </div>
//         </nav>
//         {/* part 1 : /  */}
//         {/* part 2 : /  */}
//         <div className="grid-cols-2 grid  text-white">
//           <div className="mt-[9.125rem]  ">
//             <span className="text-[2.875rem] font-bold">Dive </span>
//             <span className="text-[2.5rem] font-bold"> Into The Depths</span>
//             <div>
//               <span className="text-[2.5rem] font-bold"> Of </span>
//               <span className="text-[2.875rem] font-bold">Virtual Reality</span>
//               <p className="max-w-[28.125rem] mt-[2.25rem]">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                 eiusmod tempor incididunt ut labore et dolore nisl tincidunt
//                 eget. Lectus mauris eros in vitae .
//               </p>
//             </div>
//             <div className="mt-[4.125rem] flex gap-[2.511rem]">
//               <button className="rounded-[2.5rem] w-[9.625rem] h-[3rem] border-white border text-white font-bold text-[0.75rem] ">
//                 BUILD YOUR WORLD
//               </button>
//               <img src="/assets/ARROw.svg" alt="ARROw " />
//             </div>
//           </div>
//           {/* part 2 : / */}
//           <div className="flex justify-end ">
//             <img
//               src="/assets/hero.png"
//               alt="hero"
//               className="h-[26.625rem] w-[30.625rem] mt-[7.75rem] mr-[1.125rem] "
//             />
//             <img
//               src="/assets/heroBack.png"
//               alt="hero"
//               className="h-[28.438rem] w-[32.75rem] mt-[7rem] absolute"
//             />
//           </div>
//         </div>
//       </header>
//       {/* part 2 : /  */}
//       {/* 3eme // */}

//       <section className="mt-[5.5rem] flex text-white">
//         <div className="w-full rounded-[5.625rem] bg-black h-[10.438rem] flex flex-row content-center">
//           <div className="h-[7.281rem] pt-[1.75rem] mt-[1.625rem] flex ">
//             <img
//               src="/assets/location.svg"
//               alt="icon1"
//               className="w-[4.375rem] h-[4.375rem] ml-[2.438rem]"
//             />
//             <div className="flex flex-col">
//               <h3 className="font-bold text-[1.5rem]"> Pay Us a Visit</h3>
//               <p
//                 className="text-[0.875rem]
//   mt-[0.625rem]">
//                 Union St, Seattle, WA 98101, United States
//               </p>
//             </div>
//           </div>
//           <div className=" ml-[2.656rem] justify-center h-[7.281rem] w-[23.156rem] pt-[1.75rem] mt-[1.625rem] flex border border-y-0 ">
//             <img
//               src="/assets/call.svg"
//               alt="icon2"
//               className="w-[4.375rem] h-[4.375rem] mr-[1.813rem]"
//             />
//             <div className="flex flex-col">
//               <h3 className="font-bold text-[1.5rem]"> Give Us a Call</h3>
//               <p className="text-[0.875rem] mt-[0.625rem]">(110) 1111-1010</p>
//             </div>
//           </div>

//           <div className=" ml-[3.125rem] h-[7.281rem] pt-[1.75rem] mt-[1.625rem] flex ">
//             <img
//               src="/assets/shape.svg"
//               alt="icon3"
//               className="w-[4.375rem] h-[4.375rem] mr-[1.813rem] "
//             />
//             <div className="flex flex-col">
//               <h3 className="font-bold text-[1.5rem]">Send Us a Message</h3>
//               <p className="text-[0.875rem]  mt-[0.625rem]">
//                 Contact@HydraVTech.com
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* 3eme // */}
//       {/* 4eme // */}
//       <div className="grid-cols-2 grid  text-white ">
//         <div className="mt-[5.625rem]  ">
//           <h1 className="text-[2.25rem] font-bold">INTRODUCTION </h1>
//           <div className="flex ">
//             <span className="text-[2.25rem] h-0 font-light">TO HYDRA VR</span>
//             <img
//               className="ml-[1.875rem]  -mt-[1.563rem]"
//               src="/assets/longArrow.svg "
//               alt="longArrow"
//             />
//           </div>
//           <div>
//             <img
//               className="w-[32.75rem] h-[34.813rem] mt-[4.188rem]"
//               src="/assets/secton2.png"
//               alt="image-Section-2"
//             />
//           </div>
//           <h1 className="text-[2.25rem] font-bold mt-[6.875rem]">WHY BUILD </h1>
//           <div className="flex ">
//             <span className="text-[2.25rem] h-0 font-light">WITH HYDRA?</span>
//             <img
//               className="ml-[1.875rem]  -mt-[1.563rem]"
//               src="/assets/longArrow.svg "
//               alt="longArrow"
//             />
//           </div>
//         </div>
//         {/* middle: */}
//         <div className="mt-[5.625rem]">
//           <p className="text-[1rem]  w-[40.625rem] font-light  ">
//             Vitae sapien pellentesque habitant morbi tristique senectus et netus
//             et. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Mi sit
//             amet mauris commodo quis imperdiet massa tincidunt nunc. Viverra
//             aliquet eget sit amet tellus. Ornare lectus sit amet est placerat
//             in. Lectus magna fringilla urna porttitor rhoncus vitae.
//           </p>
//           <h1 className="mt-[9.438rem] font-bold text-[2.25rem]">ABOUT</h1>
//           <h1 className="font-light text-[2.25rem] ">HYDRA VR</h1>
//           <p className="mt-[2.625rem] leading-loose  w-[40.625rem]">
//             Eget mi proin sed libero enim sed faucibus turpis. Nisl rhoncus
//             mattis rhoncus urna neque viverra justo. Vivamus at augue eget arcu
//             dictum. Ultrices gravida dictum fusce ut placerat orci. Aenean et
//             tortor at risus viverra adipiscing at in. Mattis aliquam faucibus
//             purus in massa. Est placerat in egestas erat imperdiet sed.
//             Consequat semper viverra nam libero justo laoreet sit amet. Aliquam
//             etiam erat velit scelerisque in dictum non consectetur a. Laoreet
//             sit amet cursus sit amet. Vel eros donec ac odio tempor orci
//             dapibus. Sem nulla pha retra diam sit amet nisl suscipit adipiscing
//             bibendum. Leo a diam sollicitudi n tempor.
//           </p>
//           <button className=" text-[0.75rem] rounded-[2.5rem] w-[9.625rem] h-[3rem] border-white border text-white font-light mt-[1.75rem] ">
//             LET’S GET IN TOUCH
//           </button>
//           {/* diffrent size here />//  mt-[8.588rem] */}
//           <p className=" w-[40.625rem] mt-[8.588rem]">
//             Vitae sapien pellentesque habitant morbi tristique senectus et netus
//             et. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Mi sit
//             amet mauris commodo quis imperdiet massa tincidunt nunc. Viverra
//             aliquet eget sit amet tellus. Ornare lectus sit amet est placerat
//             in. Lectus magna fringilla urna porttitor rhoncus vitae.
//           </p>
//         </div>
//       </div>
//       {/* 4eme // */}
//       {/* 5eme // */}
//       <section>
//         <div className="grid grid-cols-4   gap-[0.688rem] mt-[6.375rem]">
//           {/* CarD1 / */}
//           <div className="bg-slate-400  flex flex-col rounded-[2.5rem] h-[31.938rem]">
//             <img
//               src="/assets/card1.png"
//               alt="card1"
//               className=" mt-[2.34rem] w-[11.933rem] h-[11.933rem] mx-auto rounded-full "
//             />
//             <img
//               src="/assets/CardsBack.png"
//               alt="card1"
//               className="  -mt-[12.8rem]  w-[13.688rem] h-[13.688rem] mx-auto  "
//             />
//             <h1 className="mt-[1.313rem] text-[1.5rem] mb-1.094rem] mx-auto text-white">
//               SIMULATION
//             </h1>
//             <div className=" border-t-2 border-white w-[9.625rem] mx-auto"></div>
//             <div className="p-[1.344rem] text-[0.75rem] text-white">
//               Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
//               porttitor rhoncus libero justo laoreet sit amet vitae.
//             </div>
//             <button className=" mx-auto mt-[0.75rem] text-[0.75rem] rounded-[2.5rem] w-[9.625rem] h-[3rem] border-white border text-white font-bold">
//               TRY IT NOW
//             </button>
//           </div>
//           {/* CarD2 / */}
//           <div className="bg-slate-400  flex flex-col rounded-[2.5rem] h-[31.938rem]">
//             <img
//               src="/assets/card2.png"
//               alt="card1"
//               className="  mt-[2.34rem] w-[11.933rem] h-[11.933rem] mx-auto rounded-full "
//             />
//             <img
//               src="/assets/CardsBack.png"
//               alt="card1"
//               className="  -mt-[12.8rem]  w-[13.688rem] h-[13.688rem] mx-auto  "
//             />

//             <h1 className="mt-[1.313rem] text-[1.5rem] mb-1.094rem] mx-auto text-white">
//               EDUCATION
//             </h1>
//             <div className=" border-t-2 border-white w-[9.625rem] mx-auto"></div>
//             <div className="p-[1.344rem] text-[0.75rem] text-white">
//               Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
//               porttitor rhoncus libero justo laoreet sit amet vitae.
//             </div>
//             <button className=" mx-auto mt-[0.75rem] text-[0.75rem] rounded-[2.5rem] w-[9.625rem] h-[3rem] border-white border text-white font-bold">
//               TRY IT NOW
//             </button>
//           </div>
//           {/* Card3/: */}
//           <div className="bg-slate-400  flex flex-col rounded-[2.5rem] h-[31.938rem]">
//             <img
//               src="/assets/card3.png"
//               alt="card1"
//               className=" mt-[2.34rem] w-[11.933rem] h-[11.933rem] mx-auto rounded-full "
//             />
//             <img
//               src="/assets/CardsBack.png"
//               alt="card1"
//               className="  -mt-[12.8rem]  w-[13.688rem] h-[13.688rem] mx-auto  "
//             />
//             <h1 className="mt-[1.313rem] text-[1.5rem] mb-1.094rem] mx-auto text-white">
//               SELF-CARE
//             </h1>
//             <div className=" border-t-2 border-white w-[9.625rem] mx-auto"></div>
//             <div className="p-[1.344rem] text-[0.75rem] text-white">
//               Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
//               porttitor rhoncus libero justo laoreet sit amet vitae.
//             </div>
//             <button className=" mx-auto mt-[0.75rem] text-[0.75rem] rounded-[2.5rem] w-[9.625rem] h-[3rem] border-white border text-white font-bold">
//               TRY IT NOW
//             </button>
//           </div>
//           {/* Card4 : */}
//           <div className="bg-slate-400  flex flex-col rounded-[2.5rem] h-[31.938rem]">
//             <img
//               src="/assets/card4.png"
//               alt="card1"
//               className=" mt-[2.34rem] w-[11.933rem] h-[11.933rem] mx-auto rounded-full "
//             />
//             <img
//               src="/assets/CardsBack.png"
//               alt="card1"
//               className="  -mt-[12.8rem]  w-[13.688rem] h-[13.688rem] mx-auto  "
//             />
//             <h1 className="mt-[1.313rem] text-[1.5rem] mb-1.094rem] mx-auto text-white">
//               OUTDOOR
//             </h1>
//             <div className=" border-t-2 border-white w-[9.625rem] mx-auto"></div>
//             <div className="p-[1.344rem] text-[0.75rem] text-white">
//               Vitae sapien pellentesque habitant morbi nunc. Viverra aliquet
//               porttitor rhoncus libero justo laoreet sit amet vitae.
//             </div>
//             <button className=" mx-auto mt-[0.75rem] text-[0.75rem] rounded-[2.5rem] w-[9.625rem] h-[3rem] border-white border text-white font-bold">
//               TRY IT NOW
//             </button>
//           </div>
//         </div>
//       </section>
//       {/* 5eme // */}
//       {/* 6eme // */}
//       <section>
//         <div className="w-full flex flex-col">
//           <h1 className="text-[2.25rem] mx-auto mt-[13.875rem] text-white font-bold z-50">
//             TECHNOLOGIES & HARDWARE
//           </h1>
//           <span className="text-[2.25rem] mx-auto  text-white  z-50 font-light">
//             USED BY HYDRA VR.
//           </span>
//           <img
//             className="mt-[7.125rem] w-[79.875rem] h-[18.938rem] rounded-full absolute "
//             src="/assets/section3.png"
//             alt="photoOFWoman"
//           />
//         </div>
//         <div className="w-full flex justify-around mt-[9.375rem]">
//           <img
//             className="w-[10.875rem] h-[10.875rem]"
//             alt=""
//             src="/assets/BarLogo1.png"
//           />
//           <img
//             className="w-[10.875rem] h-[10.875rem]"
//             alt=""
//             src="/assets/BarLogo2.png"
//           />
//           <img
//             className="w-[10.875rem] h-[10.875rem]"
//             alt=""
//             src="/assets/BarLogo3.png"
//           />
//           <img
//             className="w-[10.875rem] h-[10.875rem]"
//             alt=""
//             src="/assets/BarLogo4.png"
//           />
//         </div>
//       </section>
//       {/* 6eme /  */}
//       {/* 7eme /  */}
//       <section>
//         <div className="grid grid-cols-2 ">
//           <div className="flex flex-col">
//             <h1 className="text-[2.25rem] font-bold mt-[4.313rem] text-white">
//               HOW WE BUILD
//             </h1>
//             <div className="flex ">
//               <span className="text-[2.25rem] h-0 font-light text-white">
//                 WITH HYDRA VR?
//               </span>
//               <img
//                 className="ml-[1.875rem]  -mt-[1.563rem]"
//                 src="/assets/longArrow.svg "
//                 alt="longArrow"
//               />
//             </div>
//           </div>
//           <div>
//             <p className="mt-[4.313rem] text-white">
//               Vitae sapien pellentesque habitant morbi tristique senectus et
//               netus et. Feugiat nibh sed pulvinar proin gravida hendrerit
//               lectus. Mi sit amet mauris commodo quis imperdiet massa tincidunt
//               nunc. Viverra aliquet eget sit amet tellus. Ornare lectus sit amet
//               est placerat in. Lectus magna fringilla urna porttitor rhoncus
//               vitae.
//             </p>
//           </div>
//         </div>
//         <div className="flex  justify-around w-full">
//           <div className="flex flex-col items-center">
//             <div className="rounded-full items-center justify-center flex flex-col text-[4rem]  bg-violet-400 w-[9.938rem] h-[9.938rem] border-black border-[1.188rem] mt-[5.688rem]">
//               1
//             </div>
//             <div className="flex ">
//               <img src="assets/ARROw.svg" className="mt-[0.438rem]" />
//               <div className="mt-[1.563rem] text-white text-[1.5rem] max-w-[11.688rem]">
//                 3D Conception & Design
//               </div>
//             </div>
//           </div>

//           {/* 2 : */}
//           <div className="flex flex-col items-center">
//             <div className="rounded-full items-center justify-center flex flex-col text-[4rem]  bg-violet-400 w-[9.938rem] h-[9.938rem] border-black border-[1.188rem] mt-[5.688rem]">
//               2
//             </div>
//             <div className="flex ">
//               <img src="assets/ARROw.svg" className="mt-[0.438rem]" />
//               <div className="mt-[1.563rem] text-white text-[1.5rem] max-w-[11.688rem]">
//                 Interaction Design
//               </div>
//             </div>
//           </div>
//           {/* 3: */}
//           <div className="flex flex-col items-center">
//             <div className="rounded-full items-center justify-center flex flex-col text-[4rem]  bg-violet-400 w-[9.938rem] h-[9.938rem] border-black border-[1.188rem] mt-[5.688rem]">
//               3
//             </div>
//             <div className="flex ">
//               <img src="assets/ARROw.svg" className="mt-[0.438rem]" />
//               <div className="mt-[1.563rem] text-white text-[1.5rem] max-w-[11.688rem]">
//                 VR World User Testing
//               </div>
//             </div>
//           </div>
//           {/* 4:/ */}
//           <div className="flex flex-col items-center">
//             <div className="rounded-full items-center justify-center flex flex-col text-[4rem]  bg-violet-400 w-[9.938rem] h-[9.938rem] border-black border-[1.188rem] mt-[5.688rem]">
//               4
//             </div>
//             <div className="flex  ">
//               <img src="assets/ARROw.svg" className="mt-[0.438rem]" />
//               <div className="mt-[1.563rem] text-white text-[1.5rem] max-w-[11.688rem]">
//                 Hydra VR Deploy
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* 7eme /  */}
//       {/* 8eme /  */}
//       <section>
//         <div className=" flex flex-col mt-[7rem] w-full rounded-[6.25rem] bg-black h-[63rem] text-white items-center">
//           <h1 className="text-[2.25rem] font-bold mt-[5.625rem] mb-[1.875rem]">
//             JOIN HYDRA
//           </h1>
//           <div className=" border-t-2 border-white w-[25.875rem] mx-auto mb-[1.313rem]"></div>

//           <span className="text-[2.25rem] font-light mb-[4.063rem]">
//             Let’s Build Your VR Experience
//           </span>

//           <div className=" w-full px-[6.875rem] grid grid-cols-2  gap-x-[0.625rem] h-[63rem]">
//             {/* left side / */}
//             <div className="h-">
//               <input
//                 placeholder="First Name"
//                 className="h-[4.5rem] py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] "></input>
//               <input
//                 placeholder="Email"
//                 className="h-[4.5rem] py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] mt-[2.438rem]"></input>
//             </div>
//             {/* right side / */}
//             <div className="h-max">
//               <input
//                 placeholder="Last Name"
//                 className="h-[4.5rem] py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] "></input>
//               <input
//                 placeholder="Phone Number"
//                 className="h-[4.5rem] py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] mt-[2.438rem]"></input>
//             </div>
//             <div className="col-span-2  ">
//               <input
//                 placeholder="Phone Number"
//                 className="h-[4.5rem] py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] "></input>
//               <textarea
//                 className="h-[13.125rem] py-[1.688rem] w-full rounded-3xl border border-white pl-[2.75rem] mt-[2.438rem] resize-none mb-[3.188rem]"
//                 placeholder="Tell Us Something..."></textarea>
//               <button className=" text-[0.75rem] rounded-[2.5rem] w-[13.375rem] h-[3rem] border-white border text-white font-bold  mx-auto flex justify-center items-center">
//                 SEND TO HYDRA
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* 7eme /  */}
//       {/* 8eme /  */}
//       <footer>
//         {/* 1st / */}

//         <div className="w-[79.375rem]  flex justify-around mt-[7.656rem]">
//           <div>
//             <img
//               src="/assets/logo.svg"
//               className="w-[11.563rem] h-[11.563rem]"
//               alt=""
//             />
//           </div>
//           {/* 2eme / */}

//           <div className=" flex flex-col justify-between h-[12rem] ">
//             <a href="/ABOUT" className="text-white ">
//               ABOUT
//             </a>
//             <a href="/SERVICES" className="text-white ">
//               SERVICES
//             </a>
//             <a href="/TECHNOLOGIES" className="text-white ">
//               TECHNOLOGIES
//             </a>
//             <a href="/HOWTOJOIN" className="text-white ">
//               HOW TO JOIN HYDRA
//             </a>
//           </div>
//           {/* 3eme / */}
//           <div className=" flex flex-col justify-between h-[12rem] ">
//             <a href="/ABOUT" className="text-white ">
//               F.A.Q
//             </a>
//             <a href="/SERVICES" className="text-white ">
//               SITEMAP
//             </a>
//             <a href="/TECHNOLOGIES" className="text-white ">
//               CONDITIONS
//             </a>
//             <a href="/HOWTOJOIN" className="text-white ">
//               LICENSES
//             </a>
//           </div>
//           {/* 4eme / */}
//           <div className=" flex flex-col justify-between h-[12rem] ">
//             <h1 className="text-white font-bold ">SOCIALIZE WITH HYDRA</h1>
//             <div className="flex">
//               <img
//                 src="assets/facebook.svg"
//                 alt=""
//                 className="w-[2rem] h-[2rem] m-[0.625rem]"
//               />
//               <img
//                 src="assets/twitter.svg"
//                 alt=""
//                 className="w-[2rem] h-[2rem] m-[0.625rem]"
//               />
//               <img
//                 src="assets/linkedin.svg"
//                 alt=""
//                 className="w-[2rem] h-[2rem] m-[0.625rem]"
//               />
//               <img
//                 src="assets/youtube.svg"
//                 alt=""
//                 className="w-[2rem] h-[2rem] m-[0.625rem]"
//               />
//               <img
//                 src="assets/instagram.svg"
//                 alt=""
//                 className="w-[2rem] h-[2rem] m-[0.625rem]"
//               />
//               <img
//                 src="assets/pinterest.svg"
//                 alt=""
//                 className="w-[2rem] h-[2rem] m-[0.625rem]"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex w-full mt-[4.813rem] flex-col">
//           <hr className="w-[79.313rem]"></hr>
//           <span className="text-white mt-[3.063rem] mb-[3.688rem] mx-auto">
//             2023 © HYDRA LANDING PAGE - BY ZINE. E. FALOUTI - ALL RIGHTS
//             RESERVED
//           </span>
//         </div>
//       </footer>
//     </div>
// `;

// // REGEX: find class-[value rem]
// const regex = /(\w+)-\[(\d+(\.\d+)?)rem\]/g;

// // Replace function
// content = content.replace(regex, (match, className, value) => {
//   const original = `${className}-[${value}rem]`;
//   const newValue1 = (parseFloat(value) * (768 / 1440))
//     .toFixed(3)
//     .replace(/\.?0+$/, "");
//   const newValue = (parseFloat(value) * 0.7111)
//     .toFixed(3)
//     .replace(/\.?0+$/, ""); // Keep 1-3 decimals, clean zeros

//   const responsive = `lg:${className}-[${newValue}rem]`;
//   const responsive1 = `md:${className}-[${newValue1}rem]`;
//   return `${original} ${responsive} ${responsive1} xl:${match}`; // original + space + new
// });

// // Show the result
// // Optionally save to a file:
// // fs.writeFileSync('output.html', content);
