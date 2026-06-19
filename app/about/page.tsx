import PageHero from "../components/PageHero";
import SiteBackground from "../components/SiteBackground";
import { getPage, getSettings } from "../lib/data";
import { isManagedImage } from "../lib/images";
export default async function AboutPage(){const [p,s]=await Promise.all([getPage("about"),getSettings()]);const page=p as any;const bg=isManagedImage(s.backgroundColor)?s.backgroundColor:null;return <main><PageHero badge={page?.heroBadge} title={page?.heroTitle||p?.title||"About us"} subtitle={page?.heroSubtitle||p?.subtitle} image={s.ogImageUrl} buttonText={page?.heroButtonText} buttonLink={page?.heroButtonLink}/><SiteBackground image={bg}><div className="mx-auto max-w-5xl"><div className="whitespace-pre-line rounded-3xl bg-white/80 p-8 text-lg text-slate-700 shadow-sm backdrop-blur-sm">{p?.body}</div></div></SiteBackground></main>}
