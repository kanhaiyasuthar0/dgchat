import government from "@/data/images/government.svg";
import mentors from "@/data/images/mentors.svg";
import ngo from "@/data/images/ngo.svg";
import fpo from "@/data/images/fpo.svg";
import privateImage from "@/data/images/private.svg";

// agencies upload
import KISAN_CREDIT_CARD from "@/data/agencies/48 Kisan Credit Services.jpeg"; //Kisan Credit Services
import PRADHAN from "@/data/agencies/50 Pradhan.png"; //Pradan
import JSLPS from "@/data/agencies/51 JSLPS.jpeg"; //Jharkhand State Livelihood Promotion Society (JSLPS)
import DG from "@/data/agencies/53 Digital Green.png"; //Digital Green
import GreenGold from "@/data/agencies/42.jpeg"; //Digital Green
import OXFAM from "@/data/agencies/53 Oxfam India (Jharkhand Operations).png"; //Oxfam India (Jharkhand Operations)
import Agritech from "@/data/agencies/58 Agritech Mentorship Initiative.jpeg";
import WorldVision from "@/data/agencies/54. World Vision India (Jharkhand Branch).png";
import AgriTech_Solutions_Pvt__Ltd_ from "@/data/agencies/AgriTech Solutions Pvt. Ltd..png"; // AgriTech Solutions Pvt. Ltd.
import Green_Gold_Seeds_Pvt__Ltd___Jharkhand_Branch_ from "@/data/agencies/Green Gold Seeds Pvt. Ltd. (Jharkhand Branch).png"; // Green Gold Seeds Pvt. Ltd. (Jharkhand Branch)
import GreenTech_Polyhouses from "@/data/agencies/GreenTech Polyhouses.jpg"; // GreenTech Polyhouses
import Integrated_Watershed_Management_Programme__IWMP_ from "@/data/agencies/Integrated Watershed Management Programme (IWMP).jpg"; // Integrated Watershed Management Programme (IWMP)
import Jharkhand_AgriChem_Pvt__Ltd_ from "@/data/agencies/Jharkhand AgriChem Pvt. Ltd..jpg"; // Jharkhand AgriChem Pvt. Ltd..jpg
import Jharkhand_Agro_Farming_Solutions from "@/data/agencies/Jharkhand Agro Farming Solutions.jpg"; // Jharkhand Agro Farming Solutions.jpg
import Jharkhand_Department_of_Agriculture from "@/data/agencies/Jharkhand Department of Agriculture.png"; // Jharkhand Department of Agriculture.png
import Jharkhand_Environmental_Conservation_Agency from "@/data/agencies/Jharkhand Environmental Conservation Agency.jpg"; // Jharkhand Environmental Conservation Agency.jpg
import Jharkhand_Fisheries_Department_webp from "@/data/agencies/Jharkhand Fisheries Department.webp"; // Jharkhand Fisheries Department.webp
import Jharkhand_Forest_Department from "@/data/agencies/Jharkhand Forest Department.jpg"; // Jharkhand Forest Department.jpg
import Jharkhand_Polyhouse from "@/data/agencies/Jharkhand Polyhouse.jpg"; // Jharkhand Polyhouse.jpg
import Jharkhand_Renewable_Energy_Development_Agency from "@/data/agencies/Jharkhand Renewable Energy Development Agency.jpeg"; // Jharkhand Renewable Energy Development Agency.jpeg
import Jharkhand_Seed_Corporation from "@/data/agencies/Jharkhand Seed Corporation.jpg"; // Jharkhand Seed Corporation.jpg
import Jharkhand_State_Agricultural_Extension_Department from "@/data/agencies/Jharkhand State Agricultural Extension Department.jpg"; // Jharkhand State Agricultural Extension Department.jpg
import Jharkhand_State_Agricultural_Marketing_Board from "@/data/agencies/Jharkhand State Agricultural Marketing Board.jpg"; // Jharkhand State Agricultural Marketing Board.jpg
import Jharkhand_State_Horticulture_Mission from "@/data/agencies/Jharkhand State Horticulture Mission.png"; // Jharkhand State Horticulture Mission.png
import Kisan_Agro_Seeds from "@/data/agencies/Kisan Agro Seeds.png"; // Kisan Agro Seeds.png
import Krishi_Vigyan_Kendras__KVKs_ from "@/data/agencies/Krishi Vigyan Kendras (KVKs).png"; // Krishi Vigyan Kendras (KVKs).png
import Nirmal_Agro_Cooperative_Society from "@/data/agencies/Nirmal Agro Cooperative Society.png"; // Nirmal Agro Cooperative Society.png
import Ranchi_Agriculture_College from "@/data/agencies/Ranchi Agriculture College.png"; // Ranchi Agriculture College.png
import Ranchi_Dairy_Development_Cooperative from "@/data/agencies/Ranchi Dairy Development Cooperative.png"; // Ranchi Dairy Development Cooperative.png
import Ranchi_Farm_Equipments from "@/data/agencies/Ranchi Farm Equipments.jpg"; // Ranchi Farm Equipments.jpg
import Sunshine_Solar_Technologies from "@/data/agencies/Sunshine Solar Technologies.jpeg"; // Sunshine Solar Technologies.jpeg

interface imageObject {
  key: string;
}

export const imageObject: any = {
  Government: government,
  Private: privateImage,
  NGO: ngo,
  "FPOs and Coops": fpo,
  Mentors: mentors,
};

export const agenciesObject = {
  "Kisan Credit Services": KISAN_CREDIT_CARD,
  Pradan: PRADHAN,
  "Jharkhand State Livelihood Promotion Society (JSLPS)": JSLPS,
  "Digital Green": DG,
  "Oxfam India (Jharkhand Operations)": OXFAM,
  "AgriTech Solutions Pvt. Ltd.": AgriTech_Solutions_Pvt__Ltd_,
  "Green Gold Seeds Pvt. Ltd. (Jharkhand Branch)":
    Green_Gold_Seeds_Pvt__Ltd___Jharkhand_Branch_,
  "GreenTech Polyhouses": GreenTech_Polyhouses,
  "Integrated Watershed Management Programme (IWMP)":
    Integrated_Watershed_Management_Programme__IWMP_,
  "Jharkhand AgriChem Pvt. Ltd.": Jharkhand_AgriChem_Pvt__Ltd_,
  "Jharkhand Agro Farming Solutions": Jharkhand_Agro_Farming_Solutions,
  "Jharkhand Department of Agriculture": Jharkhand_Department_of_Agriculture,
  "Jharkhand Environmental Conservation Agency":
    Jharkhand_Environmental_Conservation_Agency,
  "Jharkhand Fisheries Department": Jharkhand_Fisheries_Department_webp,
  "Jharkhand Forest Department": Jharkhand_Forest_Department,
  "Jharkhand Polyhouse": Jharkhand_Polyhouse,
  "Jharkhand Renewable Energy Development Agency":
    Jharkhand_Renewable_Energy_Development_Agency,
  "Jharkhand Seed Corporation": Jharkhand_Seed_Corporation,
  "Jharkhand State Agricultural Extension Department":
    Jharkhand_State_Agricultural_Extension_Department,
  "Jharkhand State Agricultural Marketing Board":
    Jharkhand_State_Agricultural_Marketing_Board,
  "Jharkhand State Horticulture Mission": Jharkhand_State_Horticulture_Mission,
  "Kisan Agro Seeds": Kisan_Agro_Seeds,
  "Krishi Vigyan Kendras (KVKs)": Krishi_Vigyan_Kendras__KVKs_,
  "Nirmal Agro Cooperative Society": Nirmal_Agro_Cooperative_Society,
  "Ranchi Agriculture College": Ranchi_Agriculture_College,
  "Ranchi Dairy Development Cooperative": Ranchi_Dairy_Development_Cooperative,
  "Ranchi Farm Equipments": Ranchi_Farm_Equipments,
  "Sunshine Solar Technologies": Sunshine_Solar_Technologies,
};

// export const Keyareoriginalfromjson = {
//   "Jharkhand Department of Agriculture": Jharkhand_Department_of_Agriculture,
//   "Jharkhand State Horticulture Mission": Jharkhand_State_Horticulture_Mission,
//   "Ranchi Dairy Development Cooperative": Ranchi_Dairy_Development_Cooperative,
//   "Jharkhand Animal Husbandry Department":
//     Jharkhand_Animal_Husbandry_Department,
//   "Jharkhand Livestock Development Board (JLDB)":
//     Jharkhand_Livestock_Development_Board_JLDB,
//   "Jharkhand Forest Department": Jharkhand_Forest_Department,
//   "Saranda Forest Development Project": Saranda_Forest_Development_Project,
//   "Jharkhand Fisheries Department": Jharkhand_Fisheries_Department,
//   "Ranchi Fish Farmers Development Agency":
//     Ranchi_Fish_Farmers_Development_Agency,
//   "Jharkhand Soil and Water Conservation Department":
//     Jharkhand_Soil_and_Water_Conservation_Department,
//   "Integrated Watershed Management Programme (IWMP)":
//     Integrated_Watershed_Management_Programme_IWMP,
//   "Dhurwa Dam Irrigation Project": Dhurwa_Dam_Irrigation_Project,
//   "Jharkhand Water Resources Department": Jharkhand_Water_Resources_Department,
//   "Birsa Agricultural University": Birsa_Agricultural_University,
//   "Ranchi Agriculture College, Birsa Agricultural University":
//     Ranchi_Agriculture_College_Birsa_Agricultural_University,
//   "Krishi Vigyan Kendras (KVKs)": Krishi_Vigyan_Kendras_KVKs,
//   "Ranchi Veterinary College, Birsa Agricultural University":
//     Ranchi_Veterinary_College_Birsa_Agricultural_University,
//   "Jharkhand State Agricultural Extension Department":
//     Jharkhand_State_Agricultural_Extension_Department,
//   "Jharkhand State Agricultural Marketing Board":
//     Jharkhand_State_Agricultural_Marketing_Board,
//   "Jharkhand Environmental Conservation Agency":
//     Jharkhand_Environmental_Conservation_Agency,
//   "Jharkhand Rural Agricultural Development Department":
//     Jharkhand_Rural_Agricultural_Development_Department,
//   "Green Gold Seeds Pvt. Ltd. (Jharkhand Branch)":
//     Green_Gold_Seeds_Pvt_Ltd_Jharkhand_Branch,
//   "Jharkhand AgriChem Pvt. Ltd.": Jharkhand_AgriChem_Pvt_Ltd,
//   "Kisan Agro Seeds": Kisan_Agro_Seeds,
//   "Jharkhand Seed Corporation": Jharkhand_Seed_Corporation,
//   "Jharkhand Agro Farming Solutions": Jharkhand_Agro_Farming_Solutions,
//   "Ranchi Farm Equipments": Ranchi_Farm_Equipments,
//   "Jharkhand Renewable Energy Development Agency":
//     Jharkhand_Renewable_Energy_Development_Agency,
//   "Sunshine Solar Technologies": Sunshine_Solar_Technologies,
//   "GreenTech Polyhouses": GreenTech_Polyhouses,
//   "Jharkhand Polyhouse Development Corporation":
//     Jharkhand_Polyhouse_Development_Corporation,
//   "Jharkhand Bio-Fertilizers": Jharkhand_Bio_Fertilizers,
//   "Ranchi Agrochem Private Limited": Ranchi_Agrochem_Private_Limited,
//   "Green Earth Innovators": Green_Earth_Innovators,
//   "Sustainable Agro Solutions": Sustainable_Agro_Solutions,
//   "AgriTech Solutions Pvt. Ltd.": AgriTech_Solutions_Pvt_Ltd,
//   "Innovative Farming Technologies": Innovative_Farming_Technologies,
//   "Jharkhand Agri-Inputs Ltd.": Jharkhand_Agri_Inputs_Ltd,
//   "Sustainable Farm Supplies": Sustainable_Farm_Supplies,
//   "Jharkhand Agro Processing Corporation Ltd.":
//     Jharkhand_Agro_Processing_Corporation_Ltd,
//   "Green Gold Organics": Green_Gold_Organics,
//   "Eco-Farm Retreat": Eco_Farm_Retreat,
//   "Heritage Farm Tours": Heritage_Farm_Tours,
//   "Jharkhand Farm Management Pvt. Ltd.": Jharkhand_Farm_Management_Pvt_Ltd,
//   "AgriGrow Consultancy Services": AgriGrow_Consultancy_Services,
//   "Jharkhand Rural Bank": Jharkhand_Rural_Bank,
//   "Kisan Credit Services": Kisan_Credit_Services,
//   "Gramin Vikas Trust": Gramin_Vikas_Trust,
//   Pradan: Pradan,
//   "Jharkhand State Livelihood Promotion Society (JSLPS)":
//     Jharkhand_State_Livelihood_Promotion_Society_JSLPS,
//   "Digital Green": Digital_Green,
//   "Oxfam India (Jharkhand Operations)": Oxfam_India_Jharkhand_Operations,
//   "World Vision India (Jharkhand Branch)": World_Vision_India_Jharkhand_Branch,
//   "Rural Growth Foundation": Rural_Growth_Foundation,
//   "Innovate Jharkhand": Innovate_Jharkhand,
//   "Ajit Kumar": Ajit_Kumar,
//   "Agritech Mentorship Initiative": Agritech_Mentorship_Initiative,
//   "Green Innovate Hub": Green_Innovate_Hub,
//   "Eco-Farm Innovations": Eco_Farm_Innovations,
//   "Permaculture Pathways": Permaculture_Pathways,
//   "Ajit Kumar: Organic Farming and Sustainability":
//     Ajit_Kumar_Organic_Farming_and_Sustainability,
//   "Rita Devi: Women in Agriculture": Rita_Devi_Women_in_Agriculture,
//   "Integrated Pest Management (IPM)": Integrated_Pest_Management_IPM,
//   "Sunita Sharma: Agroforestry and Climate Resilience":
//     Sunita_Sharma_Agroforestry_and_Climate_Resilience,
//   "Vikram Singh: Water Conservation and Irrigation Techniques":
//     Vikram_Singh_Water_Conservation_and_Irrigation_Techniques,
//   "Jharkhand Farmers' Producer Company Limited":
//     Jharkhand_Farmers_Producer_Company_Limited,
//   "Nirmal Agro Cooperative Society": Nirmal_Agro_Cooperative_Society,
// };

export const valuesreoriginalcorrespondingtoimport: any = {
  "Jharkhand Department of Agriculture": Jharkhand_Department_of_Agriculture,
  "Jharkhand State Horticulture Mission": Jharkhand_State_Horticulture_Mission,
  "Ranchi Dairy Development Cooperative": Ranchi_Dairy_Development_Cooperative,
  "Jharkhand Animal Husbandry Department": Jharkhand_Department_of_Agriculture, // No specific import matched
  "Jharkhand Livestock Development Board (JLDB)":
    Jharkhand_Department_of_Agriculture, // No specific import matched
  "Jharkhand Forest Department": Jharkhand_Forest_Department,
  "Saranda Forest Development Project": Jharkhand_Department_of_Agriculture, // No specific import matched
  "Jharkhand Fisheries Department": Jharkhand_Fisheries_Department_webp,
  "Ranchi Fish Farmers Development Agency": "", // No specific import matched
  "Jharkhand Soil and Water Conservation Department":
    Jharkhand_Department_of_Agriculture, // No specific import matched
  "Integrated Watershed Management Programme (IWMP)":
    Integrated_Watershed_Management_Programme__IWMP_,
  "Dhurwa Dam Irrigation Project": Jharkhand_Department_of_Agriculture, // No specific import matched
  "Jharkhand Water Resources Department": Jharkhand_Department_of_Agriculture, // No specific import matched
  "Birsa Agricultural University": Ranchi_Agriculture_College, // No specific import matched
  "Ranchi Agriculture College, Birsa Agricultural University":
    Ranchi_Agriculture_College,
  "Krishi Vigyan Kendras (KVKs)": Krishi_Vigyan_Kendras__KVKs_,
  "Ranchi Veterinary College, Birsa Agricultural University": "", // No specific import matched
  "Jharkhand State Agricultural Extension Department":
    Jharkhand_State_Agricultural_Extension_Department,
  "Jharkhand State Agricultural Marketing Board":
    Jharkhand_State_Agricultural_Marketing_Board,
  "Jharkhand Environmental Conservation Agency":
    Jharkhand_Environmental_Conservation_Agency,
  "Jharkhand Rural Agricultural Development Department":
    Jharkhand_Department_of_Agriculture, // No specific import matched
  "Green Gold Seeds Pvt. Ltd. (Jharkhand Branch)":
    Green_Gold_Seeds_Pvt__Ltd___Jharkhand_Branch_,
  "Jharkhand AgriChem Pvt. Ltd.": Jharkhand_AgriChem_Pvt__Ltd_,
  "Kisan Agro Seeds": Kisan_Agro_Seeds,
  "Jharkhand Seed Corporation": Jharkhand_Seed_Corporation,
  "Jharkhand Agro Farming Solutions": Jharkhand_Agro_Farming_Solutions,
  "Ranchi Farm Equipments": Ranchi_Farm_Equipments,
  "Jharkhand Renewable Energy Development Agency":
    Jharkhand_Renewable_Energy_Development_Agency,
  "Sunshine Solar Technologies": Sunshine_Solar_Technologies,
  "GreenTech Polyhouses": GreenTech_Polyhouses,
  "Jharkhand Polyhouse Development Corporation": "", // No specific import matched
  "Jharkhand Bio-Fertilizers": "", // No specific import matched
  "Ranchi Agrochem Private Limited": "", // No specific import matched
  "Green Earth Innovators": "", // No specific import matched
  "Sustainable Agro Solutions": "", // No specific import matched
  "AgriTech Solutions Pvt. Ltd.": AgriTech_Solutions_Pvt__Ltd_,
  "Innovative Farming Technologies": "", // No specific import matched
  "Jharkhand Agri-Inputs Ltd.": "", // No specific import matched
  "Sustainable Farm Supplies": "", // No specific import matched
  "Jharkhand Agro Processing Corporation Ltd.": "", // No specific import matched
  "Green Gold Organics": GreenGold, // No specific import matched
  "Eco-Farm Retreat": "", // No specific import matched
  "Heritage Farm Tours": "", // No specific import matched
  "Jharkhand Farm Management Pvt. Ltd.": "", // No specific import matched
  "AgriGrow Consultancy Services": "", // No specific import matched
  "Jharkhand Rural Bank": "", // No specific import matched
  "Kisan Credit Services": KISAN_CREDIT_CARD,
  "Gramin Vikas Trust": "", // No specific import matched
  Pradan: PRADHAN,
  "Jharkhand State Livelihood Promotion Society (JSLPS)": JSLPS,
  "Digital Green": DG,
  "Oxfam India (Jharkhand Operations)": OXFAM,
  "World Vision India (Jharkhand Branch)": WorldVision, // No specific import matched
  "Rural Growth Foundation": "", // No specific import matched
  "Innovate Jharkhand": "", // No specific import matched
  "Ajit Kumar": "", // No specific import matched
  "Agritech Mentorship Initiative": Agritech, // No specific import matched
  "Green Innovate Hub": "", // No specific import matched
  "Eco-Farm Innovations": "", // No specific import matched
  "Permaculture Pathways": "", // No specific import matched
  "Ajit Kumar: Organic Farming and Sustainability": "", // No specific import matched
  "Rita Devi: Women in Agriculture": "", // No specific import matched
  "Integrated Pest Management (IPM)": "", // No specific import matched
  "Sunita Sharma: Agroforestry and Climate Resilience": "", // No specific import matched
  "Vikram Singh: Water Conservation and Irrigation Techniques": "", // No specific import matched
  "Jharkhand Farmers' Producer Company Limited": "", // No specific import matched
  "Nirmal Agro Cooperative Society": Nirmal_Agro_Cooperative_Society,
};
