import React from 'react'
import SectionTop from '../sectionTop/SectionTop'

const HomeAbout = () => {
  return (
    <div>
      <SectionTop title={"About Us"} />
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto mt-10">
      <div>
      <p className="text-gray-700 mb-4">
        Welcome to <span className="font-bold">Pet Pals</span>! We connect pets with loving homes and support animal welfare through our easy-to-use platform.
      </p>
      <h3 className="text-xl font-semibold mb-2">How It Works</h3>
      <ul className="list-disc list-inside mb-4">
        <li><span className="font-semibold">Browse by Category</span>: Find pets by species, breed, age, and more.</li>
        <li><span className="font-semibold">Search</span>: Quickly locate pets by name or category.</li>
        <li><span className="font-semibold">Post for Adoption</span>: List pets for adoption with detailed profiles.</li>
        <li><span className="font-semibold">Donation Campaigns</span>: Create and support campaigns for animal welfare.</li>
      </ul>
      <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
      <p className="text-gray-700">
        <span className="font-bold">Pet Pals</span> was created to reduce the number of pets in shelters and enhance animal welfare. Join us in making a positive impact on the lives of animals and their new families.
      </p>
      </div>
    </div>
    </div>
  )
}

export default HomeAbout
