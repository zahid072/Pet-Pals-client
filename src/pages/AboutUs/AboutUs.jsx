import React from "react";
import { Helmet } from "react-helmet";
import TextShadow from "../../components/textShadow/TextShadow";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>About || Pet Pals</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <TextShadow title={"About Pet Pals"} />
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Mission Section */}
          <section className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              Pet Pals is dedicated to improving the lives of animals by
              connecting them with loving homes and fostering a community of
              responsible pet ownership.
            </p>
            <p className="text-lg text-gray-700">
              Through our platform, we aim to reduce the number of pets in
              shelters, promote adoption, and raise awareness about animal
              welfare issues.
            </p>
          </section>

          {/* Team Section */}
          <section className="bg-white shadow-md rounded-lg p-8 mb-12">
            <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToonwNT4zbwCyq-k-qAzXexPn6URz3gT4BxQ&s"
                  alt="Team Member 1"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">John Doe</h3>
                  <p className="text-gray-700">Co-founder & CEO</p>
                </div>
              </div>
              {/* Team Member 2 */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/1443627298/photo/half-length-portrait-of-successful-male-boss-dressed-in-elegant-suit-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=eHSZdO4IeOi5luzCi4BqitGDz5IZNuJsiD0tJz3NT4w="
                  alt="Team Member 2"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
                  <p className="text-gray-700">Co-founder & COO</p>
                </div>
              </div>
              {/* Team Member 3 */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <img
                  src="https://img.freepik.com/premium-photo/smiling-adult-indian-man-with-brown-straight-hair-photo-portrait-business-person-office-front-laptop-photorealistic-ai-generated-horizontal-illustration_107173-53868.jpg"
                  alt="Team Member 3"
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Michael Johnson
                  </h3>
                  <p className="text-gray-700">Lead Developer</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
            <p className="text-lg text-gray-700 mb-4">
              Have questions or feedback? Reach out to us!
            </p>
            <p className="text-lg text-gray-700">Email: info@petpals.com</p>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
