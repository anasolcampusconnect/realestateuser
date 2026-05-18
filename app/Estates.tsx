import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PropertyCard from '../components/PropertyCard';
import BottomNav from '../components/BottomNav';
import { StatusBar } from 'expo-status-bar';

const Estates = () => {
  const router = useRouter();

  // Active filter states
  const [selectedType, setSelectedType] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All'); // 'All', 'Under 50L', '50L - 1.5Cr', '1.5Cr - 3Cr', 'Above 3Cr'
  const [selectedBuyOrRent, setSelectedBuyOrRent] = useState('All'); // 'All', 'Buy', 'Rent'
  const [selectedBeds, setSelectedBeds] = useState('All'); // 'All', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'
  const [selectedFurnished, setSelectedFurnished] = useState('All'); // 'All', 'Furnished', 'Semi-Furnished', 'Unfurnished'
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]); // Array of selected facilities

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Master property list with highly saturated, overlapping attributes so filters always show results
  const allProperties = [
    { id: '1', title: 'Real Nest Zenith', location: 'Chennai, TN', price: '$44L to $80L', beds: 2, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '2.5', type: 'Apartments', budget: 62, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '2', title: 'Real Nest Bloom', location: 'Bengaluru, KA', price: '$85L to $1.2Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '5.0', type: 'Apartments', budget: 100, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '3', title: 'Real Nest Estia', location: 'Chennai, TN', price: '$53L to $73L', beds: 2, image: require('../assets/images/banner.png'), status: 'Launching', acres: '2.4', type: 'Villas', budget: 63, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '4', title: 'Real Nest Casablanca', location: 'Coimbatore, TN', price: '$1.2Cr to $3.7Cr', beds: 4, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '18.0', type: 'Villas', budget: 245, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '5', title: 'Real Nest Highcity', location: 'Hyderabad, TS', price: '$49L to $67L', beds: 2, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '41.0', type: 'Apartments', budget: 58, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '6', title: 'Royal Paradise', location: 'Dubai, UAE', price: '$2.5Cr to $5Cr', beds: 5, image: require('../assets/images/banner.png'), status: 'Ready to Move', acres: '10.0', type: 'Villas', budget: 375, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '7', title: 'Green Meadows', location: 'Pune, MH', price: '$35L to $60L', beds: 1, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '3.5', type: 'Plots', budget: 47, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Park', 'Security', 'Metro', 'School'] },
    { id: '8', title: 'Skyline Terrace', location: 'Mumbai, MH', price: '$1.5Cr to $3Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '1.2', type: 'Penthouses', budget: 225, buyOrRent: 'Rent', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '9', title: 'Ocean View', location: 'Goa, GA', price: '$80L to $1.5Cr', beds: 2, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '2.0', type: 'Villas', budget: 115, buyOrRent: 'Rent', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '10', title: 'Urban Heights', location: 'Gurgaon, HR', price: '$90L to $2Cr', beds: 3, image: require('../assets/images/house1.jpg'), status: 'New Launch', acres: '4.5', type: 'Apartments', budget: 145, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '11', title: 'Elite Enclave', location: 'Noida, UP', price: '$70L to $1.2Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '3.8', type: 'Villas', budget: 95, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '12', title: 'The Grand', location: 'Kolkata, WB', price: '$50L to $95L', beds: 2, image: require('../assets/images/banner.png'), status: 'Launching', acres: '2.2', type: 'Commercial', budget: 72, buyOrRent: 'Rent', furnished: 'Unfurnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '13', title: 'Real Nest Crest', location: 'Chennai, TN', price: '$65L to $95L', beds: 3, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '3.1', type: 'Apartments', budget: 80, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '14', title: 'Coral Reef Villa', location: 'Goa, GA', price: '$1.8Cr to $3.5Cr', beds: 4, image: require('../assets/images/house1.jpg'), status: 'Ready to Move', acres: '1.5', type: 'Villas', budget: 265, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '15', title: 'Tech Hub Office', location: 'Bengaluru, KA', price: '$2.0Cr to $4.5Cr', beds: 0, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '0.8', type: 'Commercial', budget: 325, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '16', title: 'Silver Oak Plot', location: 'Coimbatore, TN', price: '$25L to $45L', beds: 0, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '1.2', type: 'Plots', budget: 35, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Park', 'Security', 'Metro', 'School'] },
    { id: '17', title: 'Apex Heights', location: 'Hyderabad, TS', price: '$75L to $1.1Cr', beds: 3, image: require('../assets/images/house1.jpg'), status: 'New Launch', acres: '4.0', type: 'Apartments', budget: 92, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '18', title: 'Marina Vista', location: 'Dubai, UAE', price: '$3.5Cr to $7Cr', beds: 4, image: require('../assets/images/banner.png'), status: 'Launching', acres: '0.9', type: 'Penthouses', budget: 525, buyOrRent: 'Rent', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '19', title: 'Spring Dale', location: 'Pune, MH', price: '$40L to $65L', beds: 2, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '2.8', type: 'Apartments', budget: 52, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '20', title: 'Empire Tower', location: 'Mumbai, MH', price: '$5.0Cr to $12.0Cr', beds: 0, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '1.5', type: 'Commercial', budget: 850, buyOrRent: 'Rent', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '21', title: 'Valley Plots', location: 'Pune, MH', price: '$18L to $30L', beds: 0, image: require('../assets/images/banner.png'), status: 'New Launch', acres: '8.0', type: 'Plots', budget: 24, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Park', 'Security', 'Metro', 'School'] },
    { id: '22', title: 'Signature Palace', location: 'Gurgaon, HR', price: '$2.2Cr to $4.0Cr', beds: 5, image: require('../assets/images/house2.jpg'), status: 'Ready to Move', acres: '2.1', type: 'Villas', budget: 310, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '23', title: 'River View Town', location: 'Kolkata, WB', price: '$38L to $58L', beds: 2, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '1.7', type: 'Apartments', budget: 48, buyOrRent: 'Rent', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '24', title: 'Vantage Point', location: 'Noida, UP', price: '$95L to $1.6Cr', beds: 3, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '0.6', type: 'Penthouses', budget: 127, buyOrRent: 'Rent', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '25', title: 'Golden Sands', location: 'Dubai, UAE', price: '$1.5Cr to $2.8Cr', beds: 2, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '1.4', type: 'Apartments', budget: 215, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '26', title: 'Pearl Vista', location: 'Chennai, TN', price: '$1.1Cr to $2.3Cr', beds: 4, image: require('../assets/images/house1.jpg'), status: 'New Launch', acres: '0.7', type: 'Penthouses', budget: 170, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '27', title: 'Lakeview Estate', location: 'Bengaluru, KA', price: '$1.4Cr to $2.9Cr', beds: 4, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '3.6', type: 'Villas', budget: 215, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '28', title: 'Corporate Square', location: 'Chennai, TN', price: '$3.0Cr to $6.0Cr', beds: 0, image: require('../assets/images/house2.jpg'), status: 'Ready to Move', acres: '1.1', type: 'Commercial', budget: 450, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '29', title: 'Eco Farms', location: 'Coimbatore, TN', price: '$45L to $85L', beds: 0, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '12.5', type: 'Plots', budget: 65, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Park', 'Security', 'Metro', 'School'] },
    { id: '30', title: 'The Pavilion', location: 'Mumbai, MH', price: '$4.2Cr to $8.5Cr', beds: 4, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '1.8', type: 'Villas', budget: 635, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '31', title: 'Aura Heights', location: 'Gurgaon, HR', price: '$85L to $1.3Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'Launching', acres: '3.0', type: 'Apartments', budget: 107, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '32', title: 'Capital Plaza', location: 'Noida, UP', price: '$1.2Cr to $2.5Cr', beds: 0, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '0.9', type: 'Commercial', budget: 185, buyOrRent: 'Rent', furnished: 'Unfurnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '33', title: 'Whispering Palms', location: 'Goa, GA', price: '$75L to $1.3Cr', beds: 2, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '4.2', type: 'Apartments', budget: 102, buyOrRent: 'Rent', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    
    // Additional to reach exactly 51 properties
    { id: '34', title: 'Greenwood Retreat', location: 'Coimbatore, TN', price: '$80L to $1.4Cr', beds: 3, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '5.2', type: 'Villas', budget: 110, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '35', title: 'Prestige Parkview', location: 'Bengaluru, KA', price: '$95L to $1.8Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '4.8', type: 'Apartments', budget: 135, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '36', title: 'Silicon Heights', location: 'Hyderabad, TS', price: '$60L to $95L', beds: 2, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '2.1', type: 'Apartments', budget: 78, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '37', title: 'Grand Plaza Mall', location: 'Dubai, UAE', price: '$6.0Cr to $15.0Cr', beds: 0, image: require('../assets/images/house1.jpg'), status: 'Launching', acres: '3.5', type: 'Commercial', budget: 950, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '38', title: 'Rivera Crest Plot', location: 'Pune, MH', price: '$22L to $40L', beds: 0, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '1.8', type: 'Plots', budget: 31, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Park', 'Security', 'Metro', 'School'] },
    { id: '39', title: 'The Platinum Suite', location: 'Mumbai, MH', price: '$3.8Cr to $7.5Cr', beds: 4, image: require('../assets/images/banner.png'), status: 'Ready to Move', acres: '1.0', type: 'Penthouses', budget: 560, buyOrRent: 'Rent', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '40', title: 'Whispering Winds', location: 'Goa, GA', price: '$1.2Cr to $2.2Cr', beds: 3, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '2.2', type: 'Villas', budget: 170, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '41', title: 'Central Park View', location: 'Gurgaon, HR', price: '$1.1Cr to $2.2Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '6.0', type: 'Apartments', budget: 165, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '42', title: 'Imperial Villa', location: 'Noida, UP', price: '$85L to $1.5Cr', beds: 4, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '4.2', type: 'Villas', budget: 115, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '43', title: 'Victoria Mansion', location: 'Kolkata, WB', price: '$55L to $1.1Cr', beds: 3, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '1.9', type: 'Apartments', budget: 82, buyOrRent: 'Rent', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '44', title: 'Serenity Bay', location: 'Goa, GA', price: '$1.5Cr to $2.8Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '2.5', type: 'Villas', budget: 215, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '45', title: 'Global Tech Park', location: 'Bengaluru, KA', price: '$4.5Cr to $9.0Cr', beds: 0, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '2.8', type: 'Commercial', budget: 675, buyOrRent: 'Rent', furnished: 'Unfurnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '46', title: 'Rosewood Plot', location: 'Chennai, TN', price: '$30L to $55L', beds: 0, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '1.5', type: 'Plots', budget: 42, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Park', 'Security', 'Metro', 'School'] },
    { id: '47', title: 'Blue Lagoon Penthouse', location: 'Dubai, UAE', price: '$4.0Cr to $9.0Cr', beds: 5, image: require('../assets/images/house2.jpg'), status: 'Ready to Move', acres: '1.1', type: 'Penthouses', budget: 650, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '48', title: 'Windsor Court', location: 'Pune, MH', price: '$45L to $75L', beds: 2, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '2.2', type: 'Apartments', budget: 60, buyOrRent: 'Buy', furnished: 'Semi-Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '49', title: 'Avenue Arcade', location: 'Mumbai, MH', price: '$2.5Cr to $5.5Cr', beds: 0, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '1.2', type: 'Commercial', budget: 400, buyOrRent: 'Rent', furnished: 'Unfurnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
    { id: '50', title: 'Horizon Plots', location: 'Hyderabad, TS', price: '$35L to $65L', beds: 0, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '5.5', type: 'Plots', budget: 50, buyOrRent: 'Buy', furnished: 'Unfurnished', facilities: ['Park', 'Security', 'Metro', 'School'] },
    { id: '51', title: 'Palacio Real', location: 'Dubai, UAE', price: '$5.0Cr to $10.0Cr', beds: 5, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '4.5', type: 'Villas', budget: 750, buyOrRent: 'Buy', furnished: 'Furnished', facilities: ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'] },
  ];

  // List of filter options
  const propertyTypes = ['All', 'Villas', 'Apartments', 'Commercial', 'Plots', 'Penthouses'];
  const locations = ['All', 'Chennai', 'Bengaluru', 'Coimbatore', 'Hyderabad', 'Dubai', 'Pune', 'Mumbai', 'Goa', 'Gurgaon', 'Noida', 'Kolkata'];
  const budgets = ['All', 'Under 50L', '50L - 1.5Cr', '1.5Cr - 3Cr', 'Above 3Cr'];
  const buyOrRentOptions = ['All', 'Buy', 'Rent'];
  const bedsOptions = ['All', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
  const furnishedOptions = ['All', 'Furnished', 'Semi-Furnished', 'Unfurnished'];
  const facilitiesOptions = ['Gym', 'Pool', 'Park', 'School', 'Metro', 'Security'];

  // Type-specific icons
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Villas': return 'home';
      case 'Apartments': return 'business';
      case 'Commercial': return 'briefcase';
      case 'Plots': return 'map';
      case 'Penthouses': return 'star';
      default: return 'grid';
    }
  };

  // Facility-specific icons
  const getFacilityIcon = (facility: string) => {
    switch (facility) {
      case 'Gym': return 'barbell';
      case 'Pool': return 'water';
      case 'Park': return 'leaf';
      case 'School': return 'school';
      case 'Metro': return 'train';
      case 'Security': return 'shield-checkmark';
      default: return 'ellipse';
    }
  };

  // Toggle facility in array
  const toggleFacility = (facility: string) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  // Filter properties logic based on all 7 filter types!
  const filteredProperties = allProperties.filter(prop => {
    const matchesType = selectedType === 'All' || prop.type === selectedType;
    
    const matchesLocation = selectedLocation === 'All' || prop.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    // Budget filtering logic (budget numbers are in Lakhs: 1Cr = 100)
    let matchesBudget = true;
    if (selectedBudget === 'Under 50L') {
      matchesBudget = prop.budget < 50;
    } else if (selectedBudget === '50L - 1.5Cr') {
      matchesBudget = prop.budget >= 50 && prop.budget <= 150;
    } else if (selectedBudget === '1.5Cr - 3Cr') {
      matchesBudget = prop.budget > 150 && prop.budget <= 300;
    } else if (selectedBudget === 'Above 3Cr') {
      matchesBudget = prop.budget > 300;
    }

    const matchesBuyRent = selectedBuyOrRent === 'All' || prop.buyOrRent === selectedBuyOrRent;

    // BHK filtering
    let matchesBeds = true;
    if (selectedBeds === '1 BHK') {
      matchesBeds = prop.beds === 1;
    } else if (selectedBeds === '2 BHK') {
      matchesBeds = prop.beds === 2;
    } else if (selectedBeds === '3 BHK') {
      matchesBeds = prop.beds === 3;
    } else if (selectedBeds === '4+ BHK') {
      matchesBeds = prop.beds >= 4;
    }

    const matchesFurnished = selectedFurnished === 'All' || prop.furnished === selectedFurnished;

    // Multi-select facilities filter (must match ALL selected facilities)
    const matchesFacilities = selectedFacilities.every(facility => prop.facilities.includes(facility));

    return matchesType && matchesLocation && matchesBudget && matchesBuyRent && matchesBeds && matchesFurnished && matchesFacilities;
  });

  const resetFilters = () => {
    setSelectedType('All');
    setSelectedLocation('All');
    setSelectedBudget('All');
    setSelectedBuyOrRent('All');
    setSelectedBeds('All');
    setSelectedFurnished('All');
    setSelectedFacilities([]);
  };

  // Check if any filter is active
  const hasActiveFilters = 
    selectedType !== 'All' || 
    selectedLocation !== 'All' || 
    selectedBudget !== 'All' || 
    selectedBuyOrRent !== 'All' || 
    selectedBeds !== 'All' || 
    selectedFurnished !== 'All' || 
    selectedFacilities.length > 0;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Real Nest Portal</Text>
          <View style={{ width: 24 }} />
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Discover Premium Estates</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.pageSubTitle}>Explore our listings.</Text>
            <TouchableOpacity 
              style={[styles.advancedToggle, isAdvancedOpen && styles.activeAdvancedToggle]} 
              onPress={() => setIsAdvancedOpen(!isAdvancedOpen)}
            >
              <Ionicons name="options-outline" size={16} color={isAdvancedOpen ? '#000' : '#4b5563'} />
              <Text style={[styles.advancedToggleText, isAdvancedOpen && styles.activeAdvancedToggleText]}>
                {isAdvancedOpen ? 'Hide Filters' : 'Additional Filters'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Dynamic Filters Container */}
        <View style={styles.filterCard}>
          {/* 1. Property Types Row (Always Visible) */}
          <Text style={styles.filterSectionLabel}>Property Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.pillsPadding}>
            {propertyTypes.map((type) => {
              const isSelected = selectedType === type;
              return (
                <TouchableOpacity
                  key={type}
                  onPress={() => setSelectedType(type)}
                  style={[styles.pill, isSelected && styles.activePill]}
                >
                  <Ionicons 
                    name={getTypeIcon(type) as any} 
                    size={15} 
                    color={isSelected ? '#000' : '#4b5563'} 
                    style={styles.pillIcon} 
                  />
                  <Text style={[styles.pillText, isSelected && styles.activePillText]}>{type}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* 2. Locations Row (Always Visible) */}
          <Text style={styles.filterSectionLabel}>Location</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.pillsPadding}>
            {locations.map((loc) => {
              const isSelected = selectedLocation === loc;
              return (
                <TouchableOpacity
                  key={loc}
                  onPress={() => setSelectedLocation(loc)}
                  style={[styles.pill, isSelected && styles.activePill]}
                >
                  <Ionicons 
                    name="location-outline" 
                    size={15} 
                    color={isSelected ? '#000' : '#4b5563'} 
                    style={styles.pillIcon} 
                  />
                  <Text style={[styles.pillText, isSelected && styles.activePillText]}>{loc}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Advanced/Collapsible Filters (Smooth Slide down styled) */}
          {isAdvancedOpen && (
            <View style={styles.advancedFiltersContainer}>
              <View style={styles.divider} />
              
              {/* 3. Buy or Rent Option */}
              <Text style={styles.filterSectionLabel}>Listed For</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.pillsPadding}>
                {buyOrRentOptions.map((opt) => {
                  const isSelected = selectedBuyOrRent === opt;
                  return (
                    <TouchableOpacity
                      key={opt}
                      onPress={() => setSelectedBuyOrRent(opt)}
                      style={[styles.pill, isSelected && styles.activePill]}
                    >
                      <Ionicons 
                        name={opt === 'Buy' ? 'card-outline' : 'key-outline'} 
                        size={15} 
                        color={isSelected ? '#000' : '#4b5563'} 
                        style={styles.pillIcon} 
                      />
                      <Text style={[styles.pillText, isSelected && styles.activePillText]}>{opt}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* 4. Budget Selection */}
              <Text style={styles.filterSectionLabel}>Budget</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.pillsPadding}>
                {budgets.map((b) => {
                  const isSelected = selectedBudget === b;
                  return (
                    <TouchableOpacity
                      key={b}
                      onPress={() => setSelectedBudget(b)}
                      style={[styles.pill, isSelected && styles.activePill]}
                    >
                      <Ionicons 
                        name="cash-outline" 
                        size={15} 
                        color={isSelected ? '#000' : '#4b5563'} 
                        style={styles.pillIcon} 
                      />
                      <Text style={[styles.pillText, isSelected && styles.activePillText]}>{b}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* 5. Bedrooms/BHK Selection */}
              <Text style={styles.filterSectionLabel}>Bedrooms (BHK)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.pillsPadding}>
                {bedsOptions.map((bed) => {
                  const isSelected = selectedBeds === bed;
                  return (
                    <TouchableOpacity
                      key={bed}
                      onPress={() => setSelectedBeds(bed)}
                      style={[styles.pill, isSelected && styles.activePill]}
                    >
                      <Ionicons 
                        name="bed-outline" 
                        size={15} 
                        color={isSelected ? '#000' : '#4b5563'} 
                        style={styles.pillIcon} 
                      />
                      <Text style={[styles.pillText, isSelected && styles.activePillText]}>{bed}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* 6. Furnished Status */}
              <Text style={styles.filterSectionLabel}>Furnished Status</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.pillsPadding}>
                {furnishedOptions.map((f) => {
                  const isSelected = selectedFurnished === f;
                  return (
                    <TouchableOpacity
                      key={f}
                      onPress={() => setSelectedFurnished(f)}
                      style={[styles.pill, isSelected && styles.activePill]}
                    >
                      <Ionicons 
                        name="shirt-outline" 
                        size={15} 
                        color={isSelected ? '#000' : '#4b5563'} 
                        style={styles.pillIcon} 
                      />
                      <Text style={[styles.pillText, isSelected && styles.activePillText]}>{f}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* 7. Nearby Facilities (Multi-Select!) */}
              <Text style={styles.filterSectionLabel}>Nearby Facilities (Select Multiple)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.pillsPadding}>
                {facilitiesOptions.map((facility) => {
                  const isSelected = selectedFacilities.includes(facility);
                  return (
                    <TouchableOpacity
                      key={facility}
                      onPress={() => toggleFacility(facility)}
                      style={[styles.pill, isSelected && styles.activePill]}
                    >
                      <Ionicons 
                        name={getFacilityIcon(facility) as any} 
                        size={15} 
                        color={isSelected ? '#000' : '#4b5563'} 
                        style={styles.pillIcon} 
                      />
                      <Text style={[styles.pillText, isSelected && styles.activePillText]}>{facility}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Properties Grid */}
        <View style={styles.gridSection}>
          <View style={styles.gridHeader}>
            <Text style={styles.resultsCount}>
              Showing {filteredProperties.length} Premium {filteredProperties.length === 1 ? 'Estate' : 'Estates'}
            </Text>
            {hasActiveFilters && (
              <TouchableOpacity onPress={resetFilters} style={styles.clearBtn}>
                <Text style={styles.clearBtnText}>Reset All</Text>
                <Ionicons name="close-circle" size={14} color="#FBB03B" />
              </TouchableOpacity>
            )}
          </View>

          {filteredProperties.length > 0 ? (
            <View style={styles.grid}>
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search" size={60} color="#e5e7eb" style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>No matching properties</Text>
              <Text style={styles.emptySub}>We couldn't find any properties matching all your chosen filters.</Text>
              <TouchableOpacity style={styles.resetBtn} onPress={resetFilters}>
                <Text style={styles.resetBtnText}>Clear Filters</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNav activeTab="Estates" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'web' ? 20 : 65,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  titleSection: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  subtitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.5,
  },
  pageSubTitle: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  advancedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeAdvancedToggle: {
    backgroundColor: '#FBB03B',
    borderColor: '#FBB03B',
  },
  advancedToggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4b5563',
  },
  activeAdvancedToggleText: {
    color: '#000',
  },
  filterCard: {
    width: '92%',
    maxWidth: 1200,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  filterSectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
    marginLeft: 18,
  },
  filterRow: {
    marginBottom: 16,
  },
  pillsPadding: {
    paddingHorizontal: 15,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
  },
  activePill: {
    backgroundColor: '#FBB03B',
    borderColor: '#FBB03B',
  },
  pillIcon: {
    marginRight: 6,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4b5563',
  },
  activePillText: {
    color: '#000',
  },
  advancedFiltersContainer: {
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 18,
    marginBottom: 18,
    marginTop: 8,
  },
  gridSection: {
    width: '100%',
    maxWidth: 1200,
    paddingHorizontal: 20,
  },
  gridHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  resultsCount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FBB03B',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    width: '100%',
  },
  emptyIcon: {
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: '#6b7280',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 18,
    marginBottom: 20,
    fontWeight: '500',
  },
  resetBtn: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
  },
  resetBtnText: {
    color: '#FBB03B',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default Estates;
