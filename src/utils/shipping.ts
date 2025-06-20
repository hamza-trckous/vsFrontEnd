import { getShippingPrices } from "@/api/shipping";

export const wilayas = [
  { code: "01", name: "Adrar", arabicName: "أدرار" },
  { code: "02", name: "Chlef", arabicName: "الشلف" },
  { code: "03", name: "Laghouat", arabicName: "الأغواط" },
  { code: "04", name: "Oum El Bouaghi", arabicName: "أم البواقي" },
  { code: "05", name: "Batna", arabicName: "باتنة" },
  { code: "06", name: "Béjaïa", arabicName: "بجاية" },
  { code: "07", name: "Biskra", arabicName: "بسكرة" },
  { code: "08", name: "Béchar", arabicName: "بشار" },
  { code: "09", name: "Blida", arabicName: "البليدة" },
  { code: "10", name: "Bouïra", arabicName: "البويرة" },
  { code: "11", name: "Tamanrasset", arabicName: "تمنراست" },
  { code: "12", name: "Tébessa", arabicName: "تبسة" },
  { code: "13", name: "Tlemcen", arabicName: "تلمسان" },
  { code: "14", name: "Tiaret", arabicName: "تيارت" },
  { code: "15", name: "Tizi Ouzou", arabicName: "تيزي وزو" },
  { code: "16", name: "Algiers", arabicName: "الجزائر" },
  { code: "17", name: "Djelfa", arabicName: "الجلفة" },
  { code: "18", name: "Jijel", arabicName: "جيجل" },
  { code: "19", name: "Sétif", arabicName: "سطيف" },
  { code: "20", name: "Saïda", arabicName: "سعيدة" },
  { code: "21", name: "Skikda", arabicName: "سكيكدة" },
  { code: "22", name: "Sidi Bel Abbès", arabicName: "سيدي بلعباس" },
  { code: "23", name: "Annaba", arabicName: "عنابة" },
  { code: "24", name: "Guelma", arabicName: "قالمة" },
  { code: "25", name: "Constantine", arabicName: "قسنطينة" },
  { code: "26", name: "Médéa", arabicName: "المدية" },
  { code: "27", name: "Mostaganem", arabicName: "مستغانم" },
  { code: "28", name: "M'Sila", arabicName: "المسيلة" },
  { code: "29", name: "Mascara", arabicName: "معسكر" },
  { code: "30", name: "Ouargla", arabicName: "ورقلة" },
  { code: "31", name: "Oran", arabicName: "وهران" },
  { code: "32", name: "El Bayadh", arabicName: "البيض" },
  { code: "33", name: "Illizi", arabicName: "اليزي" },
  { code: "34", name: "Bordj Bou Arréridj", arabicName: "برج بوعريريج" },
  { code: "35", name: "Boumerdès", arabicName: "بومرداس" },
  { code: "36", name: "El Tarf", arabicName: "الطارف" },
  { code: "37", name: "Tindouf", arabicName: "تندوف" },
  { code: "38", name: "Tissemsilt", arabicName: "تسمسيلت" },
  { code: "39", name: "El Oued", arabicName: "الوادي" },
  { code: "40", name: "Khenchela", arabicName: "خنشلة" },
  { code: "41", name: "Souk Ahras", arabicName: "سوق أهراس" },
  { code: "42", name: "Tipaza", arabicName: "تيبازة" },
  { code: "43", name: "Mila", arabicName: "ميلة" },
  { code: "44", name: "Aïn Defla", arabicName: "عين الدفلى" },
  { code: "45", name: "Naâma", arabicName: "النعامة" },
  { code: "46", name: "Aïn Témouchent", arabicName: "عين تموشنت" },
  { code: "47", name: "Ghardaïa", arabicName: "غرداية" },
  { code: "48", name: "Relizane", arabicName: "غليزان" },
  { code: "49", name: "Timimoun", arabicName: "تيميمون" },
  { code: "50", name: "Bordj Badji Mokhtar", arabicName: "برج باجي مختار" },
  { code: "51", name: "Ouled Djellal", arabicName: "أولاد جلال" },
  { code: "52", name: "Béni Abbès", arabicName: "بني عباس" },
  { code: "53", name: "Ain Salah", arabicName: "عين صالح" },
  { code: "54", name: "Ain Guezzam", arabicName: "عين قزّام" },
  { code: "55", name: "Touggourt", arabicName: "تقرت" },
  { code: "56", name: "Djanet", arabicName: "جانت" },
  { code: "57", name: "El M'Ghair", arabicName: "المغير" },
  { code: "58", name: "El Menia", arabicName: "المنيعة" },
];

export const fetchShippingPrices = async () => {
  try {
    const prices = await getShippingPrices();

    const pricesMap = prices.reduce(
      (
        acc: {
          [city: string]: { priceToDesktop: number; priceToHomme: number };
        },
        item: {
          wilayas: string;
          priceToDesktop: number;
          priceToHomme: number;
        }
      ) => {
        acc[item.wilayas] = {
          priceToDesktop: item.priceToDesktop,
          priceToHomme: item.priceToHomme,
        };
        return acc;
      },
      {}
    );
    return pricesMap;
  } catch (error) {
    console.error("Error fetching shipping prices:", error);
  }
};
