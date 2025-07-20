import {supabase} from "@/lib/supabase";
interface Property {
    id: number;
    nama: string;
    quote: string;
    kategori: string;
    image: string;
  }
async function getSearch() {
  const { data, error } = await supabase
    .from('ai_property')
    .select()
  if (error) {
    return null;
  }
  const dataFormed: Property[] = data.map(item => ({
    id: item.id,
    nama: item.nama,
    quote: item.quote,
    kategori: item.kategori,
    image: getImageUrl(item.trials.Image[0][1])
  }));
  return dataFormed;
}

const getImageUrl =  (path: string) => {
  const { data } = supabase.storage.from('images').getPublicUrl(path);
  return data.publicUrl;
};

export {getSearch};