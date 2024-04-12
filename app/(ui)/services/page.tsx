// service privateDecrypt

import ButtonForSidebarToggle from "@/components/generic/ButtonForSidebarToggle";
import SidebarContent from "@/components/generic/SidebarContent";
import ThemeCustomization from "@/components/generic/ThemeChanger";
import DetailListOfTools from "@/components/services/DetailListOfTools";
import Search from "@/components/services/Search";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { v4 as uuidv4 } from "uuid";

// categores :
// govt
// MENTORS
// PROVATE
// NGO'S
// //

export async function generateMetadata(
  { searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log("🚀 ~ params123:", searchParams);
  // const data = await auth();
  const previousImages = (await parent).openGraph?.images || [];
  // console.log(
  //   `${process.env.NEXTAUTH_URL}/opengraph-farmchat.png`,
  //   "inside metdata"
  // );
  return {
    title: `${
      searchParams ?? "Services"
    } | Farmer Chat by Digital Green: Empowering Farmers Through Conversation`,
    description:
      "FarmChat, powered by Digital Green, connects farmers across the globe, offering a platform for sharing insights, advice, and innovations in agriculture. Join our community to grow together.",
    openGraph: {
      type: "website",
      url: process.env.NEXTAUTH_URL,
      title: `${
        searchParams ?? "Services"
      } | Farmer Chat by Digital Green: Empowering Farmers Through Conversation`,
      description:
        "FarmChat, powered by Digital Green, connects farmers across the globe, offering a platform for sharing insights, advice, and innovations in agriculture. Join our community to grow together.",
      siteName: "FarmChat by Digital Green",
      images: [
        {
          url: `${process.env.NEXTAUTH_URL}/opengraph-farmchat.png`, // Replace '/opengraph-farmchat.jpg' with the path to your Open Graph image
          width: 1200,
          height: 630,
          alt: "FarmChat by Digital Green - Empowering Farmers Through Conversation",
        },
        // If you have more images, you can add them here
      ],
    },
  };
}

const Services = async ({
  searchParams,
}: {
  searchParams?: {
    type?: string;
    // page?: string;
  };
}) => {
  const type = searchParams?.type || "";
  // console.log("🚀 ~ type:", type);
  // const currentPage = Number(searchParams?.page) || 1;
  // const services = {
  //   government: {
  //     total_tools: 2,
  //     description:
  //       "Government services include a wide range of public services provided by government agencies. These tools aim to assist citizens in accessing vital information, services, and support in areas such as legal documentation, public health, education, and more.",
  //     tools: [
  //       {
  //         name: "National Health Service",
  //         description:
  //           "Provides comprehensive healthcare services, information, and support to the public.",
  //         active: true,
  //         no_of_likes: 10000,
  //         no_of_dislikes: 150,
  //         query_resolved: 10000000,
  //         service_logo: "https://example.com/nhs-logo.png",
  //         type: "government",
  //         service_name: "NHS Informatics",
  //       },
  //       {
  //         name: "Department of Motor Vehicles",
  //         description:
  //           "Assists with driver licensing, vehicle registration, and driving records.",
  //         active: true,
  //         no_of_likes: 7500,
  //         no_of_dislikes: 1200,
  //         query_resolved: 5000000,
  //         service_logo: "https://example.com/dmv-logo.png",
  //         type: "government",
  //         service_name: "DMV Assistance",
  //       },
  //     ],
  //   },
  //   mentors: {
  //     total_tools: 2,
  //     description:
  //       "Mentorship programs and services that provide guidance, advice, and support in various fields such as career development, personal growth, and education.",
  //     tools: [
  //       {
  //         name: "Career Growth Mentors",
  //         description:
  //           "Offers personalized career advice, resume building, and interview preparation services.",
  //         active: true,
  //         no_of_likes: 6200,
  //         no_of_dislikes: 95,
  //         query_resolved: 120000,
  //         service_logo: "https://example.com/career-growth-logo.png",
  //         type: "mentor",
  //         service_name: "CareerPath Guide",
  //       },
  //       {
  //         name: "Educational Mentors",
  //         description:
  //           "Provides tutoring, academic advice, and educational planning to students of all ages.",
  //         active: true,
  //         no_of_likes: 8300,
  //         no_of_dislikes: 78,
  //         query_resolved: 95000,
  //         service_logo: "https://example.com/edu-mentors-logo.png",
  //         type: "mentor",
  //         service_name: "StudyBuddy",
  //       },
  //     ],
  //   },
  //   private: {
  //     total_tools: 2,
  //     description:
  //       "Private services encompass a broad range of personal and commercial services offered by private entities, focusing on efficiency, customization, and innovation.",
  //     tools: [
  //       {
  //         name: "QuickLegal Consults",
  //         description:
  //           "Provides fast, reliable legal consultations on a wide range of issues.",
  //         active: true,
  //         no_of_likes: 4500,
  //         no_of_dislikes: 60,
  //         query_resolved: 15000,
  //         service_logo: "https://example.com/quicklegal-logo.png",
  //         type: "private",
  //         service_name: "QuickLegal",
  //       },
  //       {
  //         name: "HomeTech Solutions",
  //         description:
  //           "Offers cutting-edge smart home installation and troubleshooting services.",
  //         active: true,
  //         no_of_likes: 5200,
  //         no_of_dislikes: 30,
  //         query_resolved: 20000,
  //         service_logo: "https://example.com/hometech-logo.png",
  //         type: "private",
  //         service_name: "SmartHome Installers",
  //       },
  //     ],
  //   },
  //   ngos: {
  //     total_tools: 2,
  //     description:
  //       "Non-governmental organizations (NGOs) offer a variety of services aimed at promoting social causes, environmental protection, and community support.",
  //     tools: [
  //       {
  //         name: "GreenEarth Advocacy",
  //         description:
  //           "Focuses on environmental protection, conservation efforts, and awareness campaigns.",
  //         active: true,
  //         no_of_likes: 3000,
  //         no_of_dislikes: 20,
  //         query_resolved: 8000,
  //         service_logo: "https://example.com/greenearth-logo.png",
  //         type: "ngo",
  //         service_name: "GreenEarth",
  //       },
  //       {
  //         name: "Youth Empowerment Initiative",
  //         description:
  //           "Provides mentorship, education, and resources to empower young individuals.",
  //         active: true,
  //         no_of_likes: 2800,
  //         no_of_dislikes: 25,
  //         query_resolved: 5000,
  //         service_logo: "https://example.com/youth-empower-logo.png",
  //         type: "ngo",
  //         service_name: "YouthPower",
  //       },
  //     ],
  //   },
  // };

  const agricultureServices: any = {
    Government: {
      total_tools: 2,
      description:
        "Tools and services designed to optimize crop health and productivity, from planting to harvest.",
      tools: [
        {
          name: "CropHealth Department of India",
          description:
            "An AI-driven service that monitors crop health in real-time, providing insights and recommendations for disease prevention and nutrient management.",
          active: true,
          no_of_likes: 2200,
          no_of_dislikes: 50,
          query_resolved: 15000,
          service_logo:
            "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce", // Placeholder for Crop Health Monitoring
          type: "cropManagement",
          service_name: "CropHealth AI",
        },
        {
          name: "Planting Planner",
          description:
            "A comprehensive tool that assists farmers in planning their planting schedule based on weather forecasts, soil conditions, and crop cycles.",
          active: true,
          no_of_likes: 1800,
          no_of_dislikes: 30,
          query_resolved: 12000,
          service_logo:
            "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d", // Placeholder for Planting Planner
          type: "cropManagement",
          service_name: "Planting Planner",
        },
      ],
    },
    Mentors: {
      total_tools: 2,
      description:
        "Innovative solutions for the care, breeding, and health management of livestock to ensure high productivity and welfare.",
      tools: [
        {
          name: "Livestock Tracker",
          description:
            "Tracks the health and location of livestock using GPS and biometric sensors, ensuring their well-being and security.",
          active: true,
          no_of_likes: 2000,
          no_of_dislikes: 20,
          query_resolved: 10500,
          service_logo:
            "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d", // Placeholder for Livestock Tracker
          type: "livestockManagement",
          service_name: "Livestock Tracker",
        },
        {
          name: "Feed Optimizer",
          description:
            "Utilizes data analytics to recommend the optimal feed composition for different types of livestock, improving health and growth rates.",
          active: true,
          no_of_likes: 1650,
          no_of_dislikes: 18,
          query_resolved: 9500,
          service_logo:
            "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce", // Placeholder for Feed Optimizer
          type: "livestockManagement",
          service_name: "Feed Optimizer",
        },
      ],
    },
    Private: {
      total_tools: 2,
      description:
        "Cutting-edge technologies and services that push the boundaries of traditional farming practices, enhancing efficiency and sustainability.",
      tools: [
        {
          name: "Drone Field Analysis",
          description:
            "Drones equipped with advanced imaging technology provide detailed analyses of field conditions, crop health, and pest infestations.",
          active: true,
          no_of_likes: 2400,
          no_of_dislikes: 45,
          query_resolved: 13000,
          service_logo:
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", // Placeholder for Drone Analysis
          type: "agricultureInnovation",
          service_name: "Drone Field Analysis",
        },
        {
          name: "Smart Irrigation Systems",
          description:
            "Smart systems that optimize water usage for irrigation, using real-time data on soil moisture and weather conditions to conserve water.",
          active: true,
          no_of_likes: 2100,
          no_of_dislikes: 25,
          query_resolved: 11000,
          service_logo:
            "https://images.unsplash.com/photo-1516945754518-2ba34c13b3d8", // Placeholder for Smart Irrigation
          type: "agricultureInnovation",
          service_name: "Smart Irrigation Systems",
        },
      ],
    },
    NGOs: {
      total_tools: 2,
      description:
        "Cutting-edge technologies and services that push the boundaries of traditional farming practices, enhancing efficiency and sustainability.",
      tools: [
        {
          name: "Drone Field Analysis",
          description:
            "Drones equipped with advanced imaging technology provide detailed analyses of field conditions, crop health, and pest infestations.",
          active: true,
          no_of_likes: 2400,
          no_of_dislikes: 45,
          query_resolved: 13000,
          service_logo:
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05", // Placeholder for Drone Analysis
          type: "agricultureInnovation",
          service_name: "Drone Field Analysis",
        },
        {
          name: "Smart Irrigation Systems",
          description:
            "Smart systems that optimize water usage for irrigation, using real-time data on soil moisture and weather conditions to conserve water.",
          active: true,
          no_of_likes: 2100,
          no_of_dislikes: 25,
          query_resolved: 11000,
          service_logo:
            "https://images.unsplash.com/photo-1516945754518-2ba34c13b3d8", // Placeholder for Smart Irrigation
          type: "agricultureInnovation",
          service_name: "Smart Irrigation Systems",
        },
      ],
    },
  };
  const isSidebarOpen = false;

  const response = await fetch(`https://farmerchat.vercel.app/api/services`, {
    cache: "no-store",
  });
  // console.log("🚀 ~ allServices:", response);
  const allServices = await response.json();
  // console.log("🚀 ~ allServices:", allServices);

  return (
    <div className="flex relative h-screen bg-white dark:bg-gray-900 text-black dark:text-white overflow-hidden">
      <div
        className={`transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out lg:translate-x-0 flex flex-col w-64 px-4 py-8 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 lg:static fixed inset-y-0 left-0 z-30`}
      >
        <ButtonForSidebarToggle
          isSidebarOpen={isSidebarOpen}
          // toggleSidebar={() => <></>}
        />
        {/* Sidebar content */}
        {/* <div className="flex flex-col w-64 px-4 py-8 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 lg:static fixed inset-y-0 left-0 transform -translate-x-full lg:translate-x-0 transition duration-200 ease-in-out z-30"> */}
        {/* Toggler for smaller screens */}
        <div className="absolute top-4 right-0 m-4 lg:hidden block">
          <ThemeCustomization />
        </div>
        <SidebarContent />

        {/* </div> */}
      </div>
      <div className="absolute right-0 m-4 lg:block hidden top-4">
        <ThemeCustomization />
      </div>
      <div className="pl-52 pt-4  pr-52 flex-1 bg-gray-100 dark:bg-gray-900 overflow-auto ">
        <div className="">
          <div className="p-4 max-w-full mx-auto">
            <div className="bg-white dark:bg-gray-900  rounded-lg overflow-hidden">
              <div className="py-4 px-6">
                <h1 className="text-4xl text-center font-bold text-gray-800 dark:text-white">
                  Farmer Chat
                </h1>
                <p className="text-gray-600 max-w-full text-center  dark:text-gray-300 mt-2">
                  {
                    "Discover and create custom versions of ChatGPT that combine instructions, extra knowledge, and any combination of skills."
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="rounder-lg">
            <Search placeholder="Search tools..." />
          </div>
        </div>
        <Suspense fallback={"Loading..."}>
          <div className="mb-10">
            <h3 className="text-2xl font-semibold dark:text-white text-gray-900 mb-4">
              {type ? type : "Services"}
            </h3>
            <div className="grid md:grid-cols-1 gap-4">
              <div className="space-y-8">
                {!type &&
                  Object.entries(allServices.services).map(
                    ([category, services]: any) => (
                      <div key={category} className="group">
                        <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-4">
                          <>
                            <Link href={`/services?type=${category}`}>
                              {category}
                            </Link>
                          </>
                        </h2>
                        <div className="grid md:grid-cols-3 gap-4">
                          {services?.map(
                            (eachService: string, index: number) => (
                              <Link
                                key={index}
                                // onClick={() => createNewChat(eachService)}
                                href={`/chat?service=${encodeURIComponent(
                                  eachService
                                )}&id=${uuidv4()}`}
                              >
                                <div className="bg-white h-20 cursor-pointer dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                                  <div className="p-5">
                                    <h3 className="font-semibold dark:text-white text-gray-900 mb-2">
                                      {eachService}
                                    </h3>
                                    {/* <p className="text-gray-700 dark:text-gray-400 text-sm mb-4">
                                  {eachService.Description}
                                </p> */}
                                    {/* <div className="text-sm dark:text-gray-300 text-gray-600">
                                  Offering: {eachService.Offering}
                                </div> */}
                                  </div>
                                  {/* <div className="px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white text-sm">

                                </div> */}
                                </div>
                              </Link>
                            )
                          )}
                        </div>
                      </div>
                    )
                  )}
              </div>
            </div>
            {type && (
              <DetailListOfTools
                tools={agricultureServices[type]["tools"]}
                heading={type}
              />
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default Services;
