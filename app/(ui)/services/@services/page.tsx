import ThemeCustomization from "@/components/generic/ThemeChanger";
import DetailListOfTools from "@/components/services/DetailListOfTools";
import Search from "@/components/services/Search";
import { imageObject } from "@/data/image";
import Image from "next/image";
import Link from "next/link";
// import { Link } from "lucide-react";
export const dynamic = "force-dynamic";

import React, { Suspense } from "react";

const page = async ({ searchParams }: any) => {
  const type = searchParams?.type || "";
  const query = searchParams?.query || "";

  const response = await fetch(`https://farmerchat.vercel.app/api/services`, {
    cache: "no-store",
  });
  // console.log("🚀 ~ allServices:", response);
  const allServices = await response.json();
  //   console.log("🚀 ~ page ~ dataservices:", data);
  // console.log("🚀 ~ allServices:", allServices);

  //   const allServices = {
  //     services: {
  //       Government: [
  //         "Agriculture Department",
  //         "Horticulture Mission",
  //         "Livestock and Animal Husbandry",
  //         "Forestry Department",
  //         "Fisheries Department",
  //         "Soil Conservation Department",
  //         "Water Resources Department",
  //         "University ",
  //         "Extension Department",
  //       ],
  //       Private: [
  //         "Seed Companies",
  //         "Machinery and Equipment",
  //         "Solar",
  //         "Poly Houses",
  //         "Fertilizer Manufacturers",
  //         "Natural Farming",
  //         "Agro-technology Companies",
  //         "Agri-Input Suppliers",
  //         "Agro-Processing Units",
  //         "Agri-Tourism Centers",
  //         "Farm Management Services",
  //         "Agricultural Finance",
  //       ],
  //       NGO: ["National", "International"],
  //       Mentors: ["Lead Farmers and Influencers", "Sustainable Farming Mentors"],
  //       "FPOs and Coops": ["FPO"],
  //     },
  //   };

  const detailedAllServices = [
    {
      Category: "Government",
      Subcategory: "Agriculture Department",
      Name: "Jharkhand Department of Agriculture",
      Address: "Krishi Bhawan, Kanke Road, Ranchi",
      Description:
        "Serving as the cornerstone of Jharkhand's agricultural development, this department provides comprehensive support to farmers, including subsidies, training, and resources for sustainable farming practices.",
      Offering: "Subsidies, training, sustainable practices",
      "# Of Subscribers": 12000,
      "# Of Queries": 9500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Government",
      Subcategory: "Horticulture Mission",
      Name: "Jharkhand State Horticulture Mission",
      Address: "3rd Floor, FFP Building, Dhurwa, Ranchi",
      Description:
        "Boosting the horticulture sector with technical assistance, financial aid, and market access.",
      Offering: "Financial assistance, technical guidance, market access",
      "# Of Subscribers": 5600,
      "# Of Queries": 3200,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Government",
      Subcategory: "Livestock and Animal Husbandry",
      Name: "Ranchi Dairy Development Cooperative",
      Address: "H.B. Road, Lalpur, Ranchi, Jharkhand 834001",
      Description:
        "Focused on supporting dairy farmers in Jharkhand, this cooperative offers resources, training, and market access to improve dairy production and income.",
      Offering:
        "Dairy farming training, market access, cooperative membership.",
      "# Of Subscribers": 3200,
      "# Of Queries": 2100,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Government",
      Subcategory: "Livestock and Animal Husbandry",
      Name: "Jharkhand Animal Husbandry Department",
      Address: "Krishi Bhawan, Kanke Road, Ranchi",
      Description:
        "This department is dedicated to the development of the livestock sector, offering veterinary services, livestock health management, and breeding programs to enhance productivity.",
      Offering: "Veterinary services, breeding programs, disease management",
      "# Of Subscribers": 7000,
      "# Of Queries": 4500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Government",
      Subcategory: "Livestock and Animal Husbandry",
      Name: "Jharkhand Livestock Development Board (JLDB)",
      Address: "Bariatu, Ranchi, Jharkhand 834009",
      Description:
        "JLDB is committed to enhancing livestock production in the state through genetic improvement, disease control measures, and providing access to quality inputs and veterinary services, aiming to increase the income of livestock farmers.",
      Offering: "Breeding programs, veterinary services, livestock insurance.",
      "# Of Subscribers": 9000,
      "# Of Queries": 6700,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "Forestry Department",
      Name: "Jharkhand Forest Department",
      Address: "Van Bhawan, Doranda, Ranchi",
      Description:
        "Committed to the conservation, management, and enhancement of forest resources in Jharkhand, the Forest Department plays a pivotal role in maintaining ecological balance and protecting biodiversity.",
      Offering:
        "Forest conservation programs, wildlife protection, eco-tourism",
      "# Of Subscribers": 5000,
      "# Of Queries": 3200,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "Forestry Department",
      Name: "Saranda Forest Development Project",
      Address: "West Singhbhum, Jharkhand",
      Description:
        "Focused on the Saranda forest, this project aims at sustainable management and conservation of one of the largest Sal forests in Asia, balancing ecological needs with local livelihoods.",
      Offering:
        "Community forestry, biodiversity conservation, livelihood enhancement programs.",
      "# Of Subscribers": 2500,
      "# Of Queries": 1800,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Government",
      Subcategory: "Fisheries Department",
      Name: "Jharkhand Fisheries Department",
      Address: "HEC Colony, Dhurwa, Ranchi",
      Description:
        "Support to fish farmers and entrepreneurs through training, financial assistance, and sustainable aquaculture practices.",
      Offering:
        "Training in aquaculture, financial assistance for fish farming, fish seed supply",
      "# Of Subscribers": 6500,
      "# Of Queries": 4200,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "Fisheries Department",
      Name: "Ranchi Fish Farmers Development Agency",
      Address: "Kanke, Ranchi, Jharkhand 834006",
      Description:
        "A government initiative aimed at promoting and supporting fish farming activities in Ranchi and surrounding regions, providing technical support, training, and marketing assistance to enhance the livelihoods of fish farmers.",
      Offering:
        "Technical support for fish farming, marketing assistance, training programs.",
      "# Of Subscribers": 3000,
      "# Of Queries": 2000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Government",
      Subcategory: "Soil Conservation Department",
      Name: "Jharkhand Soil and Water Conservation Department",
      Address: "Doranda, Ranchi, Jharkhand 834002",
      Description:
        "Focused on preserving soil health and preventing erosion, this department implements various soil and water conservation projects across Jharkhand, ensuring sustainable land management practices among the farming community.",
      Offering:
        "Soil health management, water conservation techniques, erosion control projects.",
      "# Of Subscribers": 8000,
      "# Of Queries": 5500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "Soil Conservation Department",
      Name: "Integrated Watershed Management Programme (IWMP)",
      Address: "Dhurwa, Ranchi, Jharkhand 834004",
      Description:
        "Part of a national initiative, IWMP in Jharkhand aims to restore ecological balance by harnessing, conserving, and developing degraded natural resources such as soil and vegetative cover, with a focus on watershed management.",
      Offering:
        "Watershed development projects, rainwater harvesting, sustainable land use planning.",
      "# Of Subscribers": 4500,
      "# Of Queries": 3000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Government",
      Subcategory: "Water Resources Department",
      Name: "Dhurwa Dam Irrigation Project",
      Address: "Dhurwa, Ranchi, Jharkhand 834004",
      Description:
        "A significant initiative by the Water Resources Department to provide sustainable irrigation solutions to farmers in the surrounding areas, improving water access and agricultural productivity.",
      Offering:
        "Irrigation services, agricultural water management, support for crop planning.",
      "# Of Subscribers": 5800,
      "# Of Queries": 4600,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Government",
      Subcategory: "Water Resources Department",
      Name: "Jharkhand Water Resources Department",
      Address: "Dhurwa, Ranchi 834004",
      Description:
        "This department is responsible for the planning, creation, and maintenance of irrigation infrastructure in Jharkhand, aiming to enhance water availability for agriculture, thereby improving crop yields and farmer livelihoods.",
      Offering:
        "Irrigation infrastructure development, water conservation projects, farmer training on water management.",
      "# Of Subscribers": 11000,
      "# Of Queries": 8000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "University ",
      Name: "Birsa Agricultural University",
      Address: "Kanke, Ranchi",
      Description:
        "Agricultural education and research institution offering various programs in agriculture, veterinary sciences, and forestry.",
      Offering:
        "Degree programs in agriculture and allied sciences, research, extension services",
      "# Of Subscribers": 10000,
      "# Of Queries": 7500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "University ",
      Name: "Ranchi Agriculture College, Birsa Agricultural University",
      Address:
        "Birsa Agricultural University Campus, Kanke, Ranchi, Jharkhand 834006",
      Description:
        "As part of Birsa Agricultural University, Ranchi Agriculture College is dedicated to providing quality education and research in the field of agriculture, fostering the next generation of agricultural professionals.",
      Offering:
        "B.Sc. in Agriculture, M.Sc. in Agriculture, Ph.D. in Agriculture, research opportunities.",
      "# Of Subscribers": 3500,
      "# Of Queries": 3200,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "University ",
      Name: "Krishi Vigyan Kendras (KVKs)",
      Address: "Khunti Road, Ranchi, Jharkhand 834006",
      Description:
        "Operating under the Birsa Agricultural University, KVK Ranchi serves as a vital link between the agricultural research community and the local farming population, offering training, resources, and demonstrations on the latest agricultural technologies and practices.",
      Offering:
        "On-farm testing, demonstrations, capacity building, agro-advisory services.",
      "# Of Subscribers": 12000,
      "# Of Queries": 9000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "University ",
      Name: "Ranchi Veterinary College, Birsa Agricultural University",
      Address: "Kanke, Ranchi, Jharkhand 834006",
      Description:
        " A premier institution offering education, research, and extension services in veterinary science and animal husbandry, contributing to the development of the livestock sector in Jharkhand.",
      Offering:
        " Veterinary education, animal health research, community veterinary services.",
      "# Of Subscribers": 4500,
      "# Of Queries": 3250,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "Extension Department",
      Name: "harkhand State Agricultural Extension Department",
      Address: "Hehal, Ranchi, Jharkhand 834005",
      Description:
        "his department is pivotal in disseminating agricultural knowledge among the farming community in Jharkhand. Through a network of extension officers, it facilitates the transfer of technology, provides training, and supports farmers in adopting modern agricultural practices.",
      Offering:
        "Training and workshops, technology transfer, farmer advisories",
      "# Of Subscribers": 15000,
      "# Of Queries": 11000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Government",
      Subcategory: "Extension Department",
      Name: "Jharkhand Rural Agricultural Development Department",
      Address: "Dhurwa, Ranchi, Jharkhand 834004",
      Description:
        "Aimed at rural agricultural upliftment, this department focuses on enhancing the livelihoods of rural farmers through sustainable agricultural practices, improved access to resources, and market linkage.",
      Offering:
        "Sustainable farming practices, market access, resource allocation.",
      "# Of Subscribers": 10000,
      "# Of Queries": 8500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Seed Companies",
      Name: "Green Gold Seeds Pvt. Ltd. (Jharkhand Branch)",
      Address: "Jamshedpur, East Singhbhum, Jharkhand 831001",
      Description:
        "A leader in the provision of high-quality seeds, Green Gold Seeds specializes in a range of agricultural and vegetable seeds designed for the diverse climatic conditions of Jharkhand.",
      Offering: "High-yield agricultural seeds, vegetable seeds.",
      "# Of Subscribers": 8400,
      "# Of Queries": 5600,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Seed Companies",
      Name: "Jharkhand Seed Corporation",
      Address: "Ranchi, Jharkhand 834002",
      Description:
        "Government-owned corporation ensuring the availability of high-quality seeds at affordable prices to the farming community of Jharkhand.",
      Offering: "Certified seeds for a variety of crops.",
      "# Of Subscribers": 10200,
      "# Of Queries": 7000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Machinery and Equipment",
      Name: "Jharkhand Agro Farming Solutions",
      Address: "Tata Rd, Jamshedpur",
      Description: "Provider of agricultural machinery and farm equipment.",
      Offering: "Tractors, harvesters, ploughs, irrigation equipment",
      "# Of Subscribers": 6500,
      "# Of Queries": 4800,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Machinery and Equipment",
      Name: "Ranchi Farm Equipments",
      Address: "Singh More, Hatia, Ranchi, Jharkhand 834003",
      Description:
        " Specializes in supplying high-quality farm equipment and machinery tailored to the needs of Jharkhand's agricultural sector, with a focus on sustainability and innovation.",
      Offering:
        "Seed drills, sprayers, tillers, and eco-friendly farming tools.",
      "# Of Subscribers": 4700,
      "# Of Queries": 3000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Solar",
      Name: "Jharkhand Renewable Energy Development Agency",
      Address: "3rd Floor, Engineer's Hostel-I, Dhurwa, Ranchi",
      Description: "Promoting renewable energy solutions in agriculture.",
      Offering:
        "Solar water pumps, solar lighting for rural and agricultural use",
      "# Of Subscribers": 7000,
      "# Of Queries": 5400,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Solar",
      Name: "Sunshine Solar Technologies",
      Address: "Harmu Housing Colony, Ranchi, Jharkhand 834012",
      Description:
        " A leading provider of solar energy solutions in Jharkhand, Sunshine Solar Technologies specializes in solar installations for farms, including irrigation pumps and greenhouse lighting.",
      Offering:
        "Solar irrigation pumps, solar-powered lights for greenhouses and farms.",
      "# Of Subscribers": 4300,
      "# Of Queries": 2900,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Poly Houses",
      Name: "GreenTech Polyhouses",
      Address: "Tupudana, Hatia, Ranchi, Jharkhand 834003",
      Description:
        "GreenTech Polyhouses is dedicated to providing state-of-the-art polyhouse solutions to farmers in Jharkhand, including design, installation, and agronomy support to maximize yield and profitability.",
      Offering:
        "Custom polyhouse designs, installation services, agronomy consultancy.",
      "# Of Subscribers": 2800,
      "# Of Queries": 1950,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Poly Houses",
      Name: "Jharkhand Polyhouse Development Corporation",
      Address: "Hehal, Ratu Road, Ranchi",
      Description:
        "- **Offering:** Custom polyhouse designs, installation services, agronomy consultancy.",
      Offering:
        "Polyhouse construction services, high-value crop production, technical support",
      "# Of Subscribers": 3200,
      "# Of Queries": 2100,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Fertilizer Manufacturers",
      Name: "Jharkhand Bio-Fertilizers",
      Address: "Bokaro, Jharkhand 827014",
      Description:
        "Jharkhand Bio-Fertilizers is at the forefront of sustainable agriculture, producing environmentally friendly bio-fertilizers that enhance soil fertility and crop yield without harming the ecosystem.",
      Offering: "Bio-fertilizers, organic manures, soil conditioners.",
      "# Of Subscribers": 6000,
      "# Of Queries": 4500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Fertilizer Manufacturers",
      Name: "Ranchi Agrochem Private Limited",
      Address: "Namkum, Ranchi, Jharkhand 834010",
      Description:
        "Specializing in the manufacture and supply of chemical fertilizers, Ranchi Agrochem Private Limited supports Jharkhand's agricultural sector with products designed to boost productivity and crop health.",
      Offering:
        "Chemical fertilizers, soil amendments, plant growth regulators.",
      "# Of Subscribers": 5000,
      "# Of Queries": 3600,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Natural Farming",
      Name: "Green Earth Innovators",
      Address: "Singhbhum, Jharkhand",
      Description:
        " Green Earth Innovators offers consultancy and training services in natural farming techniques, promoting sustainable agriculture practices that restore soil health and increase biodiversity.",
      Offering:
        "Natural farming training programs, soil health consultancy, sustainable farming practices workshops.",
      "# Of Subscribers": 3500,
      "# Of Queries": 2650,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Natural Farming",
      Name: "Sustainable Agro Solutions",
      Address: "Dhanbad, Jharkhand",
      Description:
        " As advocates for eco-friendly farming, Sustainable Agro Solutions provides expert advice and training on organic farming methods, permaculture design, and integrated pest management, contributing to the resilience and sustainability of agriculture in Jharkhand.",
      Offering:
        "Organic farming consultancy, permaculture design workshops, integrated pest management.",
      "# Of Subscribers": 2000,
      "# Of Queries": 1500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Agro-technology Companies",
      Name: "AgriTech Solutions Pvt. Ltd.",
      Address: "Jamshedpur, Jharkhand",
      Description:
        "Leveraging cutting-edge technology, AgriTech Solutions is revolutionizing the agricultural landscape of Jharkhand with smart farming solutions, precision agriculture, and data-driven insights for farmers and agribusinesses.",
      Offering:
        "Precision agriculture, smart farming technologies, data analytics services.",
      "# Of Subscribers": 4200,
      "# Of Queries": 3100,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Agro-technology Companies",
      Name: "Innovative Farming Technologies",
      Address: " Bokaro Steel City, Jharkhand",
      Description:
        " Specializing in innovative agricultural products and services, this company supports Jharkhand's agricultural sector by providing sustainable solutions such as water-saving irrigation systems and organic pest control.",
      Offering:
        "Sustainable irrigation solutions, organic pest control, crop health monitoring.",
      "# Of Subscribers": 3000,
      "# Of Queries": 2200,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Agri-Input Suppliers",
      Name: "Jharkhand Agri-Inputs Ltd.",
      Address: " Ranchi, Jharkhand",
      Description:
        "A leading supplier of high-quality agricultural inputs in Jharkhand, offering a wide range of products from seeds and fertilizers to pesticides and farm equipment, tailored to meet the needs of the local farming community.",
      Offering: "Seeds, fertilizers, pesticides, farm equipment.",
      "# Of Subscribers": 5500,
      "# Of Queries": 4000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Agri-Input Suppliers",
      Name: "Sustainable Farm Supplies",
      Address: "Dhanbad, Jharkhand",
      Description:
        "Committed to promoting sustainable agriculture in Jharkhand, Sustainable Farm Supplies offers eco-friendly and organic farming inputs, including bio-fertilizers, organic seeds, and natural pest control solutions.",
      Offering: "Organic seeds, bio-fertilizers, natural pest control methods.",
      "# Of Subscribers": 2800,
      "# Of Queries": 1900,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Agro-Processing Units",
      Name: "Jharkhand Agro Processing Corporation Ltd.",
      Address: "Industrial Area, Ranchi, Jharkhand 834003",
      Description:
        " A leading agro-processing unit aiming to enhance the value of agricultural produce in Jharkhand, this corporation facilitates the processing of various crops into finished goods, thereby increasing farmer incomes and reducing wastage.",
      Offering:
        "Crop processing, marketing support, value-added agricultural products.",
      "# Of Subscribers": 7000,
      "# Of Queries": 4800,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Agro-Processing Units",
      Name: "Green Gold Organics",
      Address: "Deoghar, Jharkhand 814112",
      Description:
        "Specializing in organic agro-processing, Green Gold Organics is dedicated to producing high-quality, organic food products while promoting sustainable agricultural practices among local farmers.",
      Offering:
        "Organic food processing, certification support, market linkage for organic products.",
      "# Of Subscribers": 5200,
      "# Of Queries": 3700,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Agri-Tourism Centers",
      Name: "Eco-Farm Retreat",
      Address: " Near Dassam Falls, Ranchi, Jharkhand 835202",
      Description:
        "An agri-tourism center set in the picturesque landscapes of Jharkhand, offering visitors a chance to experience farm life, learn about sustainable agriculture, and enjoy local cuisine and culture.",
      Offering: "Farm stays, agricultural workshops, cultural tours.",
      "# Of Subscribers": 2000,
      "# Of Queries": 1500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Agri-Tourism Centers",
      Name: "Heritage Farm Tours",
      Address: "Hazaribagh, Jharkhand 825301",
      Description:
        " Combining agriculture with heritage, this farm offers guided tours that explore the rich cultural and agricultural heritage of Jharkhand, providing an immersive experience into traditional farming practices and local history.\n",
      Offering:
        "Guided agricultural and heritage tours, traditional farming experience, local cuisine tasting.",
      "# Of Subscribers": 1200,
      "# Of Queries": 900,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Farm Management Services",
      Name: "Jharkhand Farm Management Pvt. Ltd.",
      Address: "Jamshedpur, Jharkhand 831001",
      Description:
        "Offering comprehensive farm management solutions to optimize productivity and profitability, this company provides services ranging from soil health analysis to crop selection and marketing strategies.",
      Offering:
        "Soil health analysis, crop planning and management, marketing and sales support.",
      "# Of Subscribers": 6200,
      "# Of Queries": 4900,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Farm Management Services",
      Name: "AgriGrow Consultancy Services",
      Address: "Dhanbad, Jharkhand 826001",
      Description:
        "Specializing in agronomy and farm business consultancy, AgriGrow helps farmers in Jharkhand adopt modern agricultural practices, improve farm operations, and increase market access.",
      Offering:
        "Agronomy consulting, farm business planning, access to technology and markets.",
      "# Of Subscribers": 3700,
      "# Of Queries": 2800,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Private",
      Subcategory: "Agricultural Finance",
      Name: "Jharkhand Rural Bank",
      Address: "Ranchi, Jharkhand 834001",
      Description:
        "Catering specifically to the financial needs of the rural and agricultural sectors in Jharkhand, Jharkhand Rural Bank offers loans, savings products, and other financial services designed to support farm operations and rural development.",
      Offering: " Agricultural loans, savings accounts, insurance products.",
      "# Of Subscribers": 20000,
      "# Of Queries": 15000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Private",
      Subcategory: "Agricultural Finance",
      Name: "Kisan Credit Services",
      Address: " Bokaro, Jharkhand 827001",
      Description:
        "Providing specialized financial services to the agricultural community, Kisan Credit Services offers accessible credit solutions to farmers, aiding them in meeting the operational costs of farming and investment in infrastructure.",
      Offering:
        "Kisan credit cards, agricultural loans, financial advisory services.",
      "# Of Subscribers": 10000,
      "# Of Queries": 7500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "NGO",
      Subcategory: "National",
      Name: "Gramin Vikas Trust",
      Address: "Hesag, Hatia, Ranchi, Jharkhand 834003",
      Description:
        "Focused on rural development, this trust works to improve the livelihoods of farmers in Jharkhand through sustainable agriculture, water management, and capacity building.",
      Offering:
        "Water resource management, agricultural training, capacity building.",
      "# Of Subscribers": 4500,
      "# Of Queries": 3100,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "NGO",
      Subcategory: "National",
      Name: "Pradan",
      Address: "Dipatoli, Ranchi",
      Description:
        "Empowering farmers through innovative agricultural practices, microfinance, and social mobilization.",
      Offering:
        "Microfinance services, agricultural training, women empowerment",
      "# Of Subscribers": 15000,
      "# Of Queries": 11000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "NGO",
      Subcategory: "National",
      Name: "Jharkhand State Livelihood Promotion Society (JSLPS)",
      Address: "3rd Floor, FFP Building, Dhurwa, Ranchi, Jharkhand 834004",
      Description:
        "JSLPS is an autonomous society under the Department of Rural Development, Government of Jharkhand. Its mission is to improve rural livelihood options and work towards social and economic empowerment of rural poor and women.",
      Offering:
        "Skill development, microfinance services, agricultural business promotion, women's self-help groups.",
      "# Of Subscribers": 20000,
      "# Of Queries": 15000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "NGO",
      Subcategory: "National",
      Name: "Digital Green",
      Address: " 2nd Floor, Dhurwa, Ranchi, Jharkhand 834002",
      Description:
        " Digital Green is an international non-governmental organization that uses technology and grassroots level partnerships to improve the livelihoods of rural communities across Jharkhand by empowering them with best practices in farming and healthcare.",
      Offering:
        " Video-based learning for farmers, community engagement, agricultural best practices, health, and nutrition education.",
      "# Of Subscribers": 12000,
      "# Of Queries": 9500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "NGO",
      Subcategory: "International",
      Name: "Oxfam India (Jharkhand Operations)",
      Address: " Mahatma Gandhi Main Rd, Ranchi, Jharkhand 834008",
      Description:
        "Oxfam India works in Jharkhand to eradicate poverty and injustice, with a focus on sustainable agriculture, gender equality, and education.",
      Offering:
        "Sustainable agriculture projects, gender justice programs, education for underprivileged children.",
      "# Of Subscribers": 5400,
      "# Of Queries": 4000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "NGO",
      Subcategory: "International",
      Name: "World Vision India (Jharkhand Branch)",
      Address: "Main Road, Ranchi",
      Description:
        "Improving lives of rural communities through agricultural development, child welfare, and disaster response.",
      Offering:
        "Child sponsorship, agricultural and vocational training, disaster relief",
      "# Of Subscribers": 9000,
      "# Of Queries": 6500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Mentors",
      Subcategory: "Lead Farmers and Influencers",
      Name: "Ajit Kumar",
      Address: "Hazaribagh, Jharkhand",
      Description:
        "Pioneering work in organic farming, transforming farm into a model of sustainable agriculture.",
      Offering:
        "Workshops on organic farming, on-farm training, organic certification guidance",
      "# Of Subscribers": 3500,
      "# Of Queries": 2500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Mentors",
      Subcategory: "Lead Farmers and Influencers",
      Name: "Agritech Mentorship Initiative",
      Address: "Harmu, Ranchi, Jharkhand 834012",
      Description:
        "A pioneering program connecting veteran agricultural experts with upcoming farmers and agripreneurs in Jharkhand, providing guidance on modern farming techniques, business development, and market linkage.",
      Offering:
        "Mentorship programs, technical workshops, market access strategies.",
      "# Of Subscribers": 1000,
      "# Of Queries": 750,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Mentors",
      Subcategory: "Lead Farmers and Influencers",
      Name: "Green Innovate Hub",
      Address: " Ashok Nagar, Ranchi, Jharkhand 834002",
      Description:
        "Facilitating growth and innovation in agriculture, Green Innovate Hub offers mentoring services by industry leaders to help agri-businesses scale, innovate, and become market leaders.",
      Offering:
        " Business mentorship, innovation workshops, networking opportunities.",
      "# Of Subscribers": 800,
      "# Of Queries": 620,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Mentors",
      Subcategory: "Sustainable Farming Mentors",
      Name: "Eco-Farm Innovations",
      Address: "Hazaribagh, Jharkhand",
      Description:
        "A pioneer in sustainable farming practices in Jharkhand, Eco-Farm Innovations provides mentorship and training to farmers eager to adopt eco-friendly and economically viable farming methods.",
      Offering:
        " Mentorship in sustainable farming, eco-friendly farm design, training workshops.",
      "# Of Subscribers": 1200,
      "# Of Queries": 900,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Mentors",
      Subcategory: "Lead Farmers and Influencers",
      Name: "Permaculture Pathways",
      Address: "Giridih, Jharkhand",
      Description:
        " Guiding farmers towards self-sufficiency and resilience, Permaculture Pathways offers expertise in permaculture design and practices, helping to transform conventional farms into sustainable ecosystems.",
      Offering:
        "Permaculture design consultancy, sustainable agriculture training, agroforestry practices.",
      "# Of Subscribers": 900,
      "# Of Queries": 700,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Mentors",
      Subcategory: "Lead Farmers and Influencers",
      Name: "Ajit Kumar: Organic Farming and Sustainability",
      Address: "Hazaribagh, Jharkhand",
      Description:
        "Ajit Kumar is renowned for his pioneering work in organic farming in Jharkhand. With over two decades of experience, he has transformed his farm into a model of sustainable agriculture, mentoring thousands of farmers in adopting organic practices to improve soil health and crop yields.",
      Offering:
        "Workshops on organic farming, on-farm training, organic certification guidance.",
      "# Of Subscribers": 3500,
      "# Of Queries": 2500,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Mentors",
      Subcategory: "Lead Farmers and Influencers",
      Name: "Rita Devi: Women in Agriculture",
      Address: "Giridih, Jharkhand",
      Description:
        "Rita Devi is a champion for women's empowerment in rural Jharkhand. She leads a women's cooperative that focuses on training female farmers in crop management, financial literacy, and market access, significantly boosting their participation in agriculture.",
      Offering:
        "Training in crop management, financial literacy workshops, market linkage support.",
      "# Of Subscribers": 4000,
      "# Of Queries": 3100,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Mentors",
      Subcategory: "Lead Farmers and Influencers",
      Name: "Integrated Pest Management (IPM)",
      Address: "Ranchi, Jharkhand",
      Description:
        "An expert in IPM, Manoj Singh has been instrumental in teaching farmers how to reduce their reliance on chemical pesticides, thereby promoting a healthier environment and reducing production costs. His methods have been widely adopted across the region.",
      Offering:
        "IPM workshops, on-site pest management consulting, natural pest control methods.",
      "# Of Subscribers": 2800,
      "# Of Queries": 2000,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "Mentors",
      Subcategory: "Lead Farmers and Influencers",
      Name: "Sunita Sharma: Agroforestry and Climate Resilience",
      Address: "Dumka, Jharkhand",
      Description:
        "Sunita Sharma advocates for agroforestry as a means to improve farm biodiversity, enhance soil health, and build climate resilience. Through her innovative training programs, she has helped many farmers integrate trees into their farming systems, opening up new income streams and improving farm ecosystems.",
      Offering:
        "Agroforestry training programs, climate resilience strategies, biodiversity enhancement techniques.",
      "# Of Subscribers": 3200,
      "# Of Queries": 2400,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "Mentors",
      Subcategory: "Lead Farmers and Influencers",
      Name: "Vikram Singh: Water Conservation and Irrigation Techniques",
      Address: "Palamu, Jharkhand",
      Description:
        "Vikram Singh is a mentor in water conservation, guiding farmers in rainwater harvesting and efficient irrigation techniques such as drip and sprinkler systems. His efforts have led to significant water savings and increased crop yields in water-scarce regions.",
      Offering:
        "Training in water conservation, installation of irrigation systems, rainwater harvesting projects.",
      "# Of Subscribers": 1900,
      "# Of Queries": 1400,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
    {
      Category: "FPOs and Coops",
      Subcategory: "FPO",
      Name: "Jharkhand Farmers' Producer Company Limited",
      Address: "Kishoreganj, Ranchi",
      Description:
        "Farmer-owned venture for better market access, collective bargaining, and shared resources.",
      Offering:
        "Collective selling, bulk purchase discounts, shared use of farm machinery",
      "# Of Subscribers": 2200,
      "# Of Queries": 1700,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2605",
    },
    {
      Category: "FPOs and Coops",
      Subcategory: "FPO",
      Name: "Nirmal Agro Cooperative Society",
      Address: "Gumla, Jharkhand 835224",
      Description:
        "Focused on empowering small and marginal farmers in Jharkhand, Nirmal Agro Cooperative Society facilitates access to sustainable farming practices, financial services, and markets.",
      Offering:
        "Sustainable farming training, financial services, market access.",
      "# Of Subscribers": 3000,
      "# Of Queries": 2250,
      "# Of Ratings": "\u2605\u2605\u2605\u2605\u2606",
    },
  ];

  return (
    <div className="px-6 p-4">
      <div className="absolute right-0 m-4 lg:block hidden">
        <ThemeCustomization />
      </div>
      <div className="">
        <div className="py-4 max-w-full mx-auto">
          <div className="bg-white dark:bg-gray-900  rounded-lg overflow-hidden">
            <div className="py-4">
              <h1 className="text-4xl text-center font-bold text-gray-800 dark:text-white">
                Farmer Chat
              </h1>
              <p className="text-gray-600 max-w-[600px] m-auto text-center dark:text-gray-300 mt-2">
                {
                  "Discover custom versions of innovative tools designed specifically for the agricultural sector."
                }
              </p>
            </div>
          </div>
        </div>

        <div className="rounder-lg bg-white dark:bg-gray-100 rounded-lg">
          <Search placeholder="Search tools..." query={query} />
        </div>
      </div>
      <Suspense fallback={"Loading..."}>
        <div className="mb-10">
          <h3 className="text-2xl font-semibold dark:text-white text-gray-900 mb-4">
            {type ? type : ""}
          </h3>
          <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
            {/* <div className="space-y-8"> */}
            {!type &&
              Object.entries(allServices.services).map(
                ([category, services]: any) => {
                  console.log(category, "cate");
                  if (
                    query &&
                    !category
                      .trim()
                      .toLowerCase()
                      .includes(query.trim().toLowerCase())
                  ) {
                    return;
                  }
                  return (
                    <div
                      key={category}
                      className="bg-white text-white dark:text-black dark:bg-gray-800 cursor-pointer  text-center flex flex-col justify-center items-center p-4 shadow-md rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
                    >
                      <Link
                        href={`/services?type=${category}`}
                        className="w-full h-full flex flex-col items-center  justify-center"
                      >
                        <Image
                          src={imageObject[category]}
                          alt={category}
                          height={60} // Adjusted for better visibility
                          width={60} // Adjusted for better visibility
                          className="mb-2 bg-gray-400 dark:bg-gray-800 p-1 rounded-lg"
                        />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                          {category}
                        </h2>
                        <div className="text-sm text-gray-900 dark:text-gray-300">
                          Total services: {services?.length}
                        </div>
                      </Link>
                    </div>
                  );
                }
              )}
            {/* </div> */}
          </div>
          {type && (
            <DetailListOfTools
              tools={detailedAllServices}
              query={query}
              heading={type}
            />
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default page;
