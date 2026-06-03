export const filterData = [
  {
    id: "color",
    name: "Color",
    type: "select",
    label: "Color",
    options: [
      { label: "Black", value: "black" },
      { label: "White", value: "white" },
      { label: "Blue", value: "blue" },
      { label: "Red", value: "red" },
    ],
  },
  {
    id: "price",
    name: "Price",
    label: "Price",
    type: "radio",
    options: [
      { label: "Under ₹500", value: "0-500" },
      { label: "₹500 - ₹1000", value: "500-1000" },
      { label: "₹1000 - ₹2000", value: "1000-2000" },
      { label: "₹2000 - ₹5000", value: "2000-5000" },
      { label: "Above ₹5000", value: "5000+" },
    ],
  },
  {
    id: "size",
    name: "Size",
    type: "select",
    label: "Size",
    options: [
      { label: "Small", value: "s" },
      { label: "Medium", value: "m" },
      { label: "Large", value: "l" },
      { label: "Extra Large", value: "xl" },
    ],
  },
  {
    id: "discount",
    name: "Discount Range",
    type: "radio",
    label: "Discount Range",
    options: [
      { label: "10% or more", value: "10" },
      { label: "20% or more", value: "20" },
      { label: "30% or more", value: "30" },
      { label: "50% or more", value: "50" },
    ],
  },
  {
    id: "availability",
    name: "Availability",
    type: "radio",
    label: "Availability",
    options: [
      { label: "In Stock", value: "in_stock" },
      { label: "Out of Stock", value: "out_of_stock" },
      { label: "Pre-order", value: "preorder" },
    ],
  },
];
