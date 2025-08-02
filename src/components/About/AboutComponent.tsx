import React from "react";
import { useProfileContext } from "@/context/ProfileContext";

const AboutComponent = () => {
  const { Profile } = useProfileContext();

  return (
    <div className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          About Us
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to{" "}
          <span className="font-semibold text-black">
            {Profile.nameOfBrand.name}
          </span>
          , your all-in-one online store built for everyone. Whether
          {"you're"} starting a niche brand, launching your personal product
          line, or simply looking to explore endless categories —{" "}
          {Profile.nameOfBrand.name} is your platform.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Designed with flexibility in mind, {Profile.nameOfBrand.name} lets you
          fully customize your store name, logo, and categories. {"It's"} more
          than just an ecommerce site — {"It's"} a ready-to-sell, fully
          adaptable solution for creators, sellers, and entrepreneurs of all
          kinds.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          We believe in simplicity, scalability, and giving you the tools to
          grow without limits. With clean performance, strong SEO foundations,
          and mobile-friendly design, {Profile.nameOfBrand.name} is made for the
          future of ecommerce.
        </p>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            To empower every creator and seller to launch their own store
            effortlessly, without code, limits, or barriers.
          </p>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Contact Us
          </h2>
          {/* you should add email in profil backend {{  Profile.nameOfBrand.email}} */}
          <p className="text-lg text-gray-700 leading-relaxed">
            Have questions? Reach out to us at{" "}
            <a
              href="mailto:support@shopverse.com"
              className="text-blue-600 hover:underline"
            >
              support@shopverse.com
            </a>{" "}
            and we’ll be happy to help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
