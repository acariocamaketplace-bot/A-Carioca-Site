import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import heroAsset from "@/assets/rio-hero.webp.asset.json";
import corcovadoMask from "@/assets/rio-corcovado-mask.jpg";
import { Button } from "@/components/ui/button";
import type { CSSProperties } from "react";
import mRed from "@/assets/mockup.vermelho.png";
import mOrange from "@/assets/mockup.laranja.png";
import mSea from "@/assets/mockup.ciano.png";
import mViolet from "@/assets/mockup.roxo.png";
import b1 from "@/assets/about-benefits-image1.jpeg";
import b2 from "@/assets/about-benefits-image2.jpeg";
import b3 from "@/assets/about-benefits-image3.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Carioca — O Rio de Janeiro na palma da sua mão" },
      { name: "description", content: "Descubra lojas, produtos e serviços perto de você. Lojistas anunciam sem comissão por venda." },
      { property: "og:title", content: "A Carioca — O Rio na palma da sua mão" },
      { property: "og:description", content: "O marketplace do comércio local carioca. Sem comissão por venda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => setY(window.scrollY)); };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return y;
}

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Index() {
  useReveal();
  return (
    <main className="overflow-x-clip">
      <Nav />
      <Hero />
      <Manifesto />
      <Features />
      <Marquee />
      <Benefits />
      <Plans />
      <Calculator />
      <Faq />
      <Footer />
    </main>
  );
}

function Nav() {
  const y = useScrollY();
  const solid = y > 60;
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${solid ? "py-3" : "py-6"}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${solid ? "mx-4 bg-ink/80 backdrop-blur-xl md:mx-auto" : ""}`}>
        <a href="#top" className="flex items-baseline gap-2 text-ink-foreground">
          <span className="font-display text-2xl font-bold">A Carioca</span>
          <span className="font-serif-i hidden text-sun sm:inline">rio, perto.</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-foreground/80 md:flex">
          {[["Sobre", "#sobre"], ["Benefícios", "#beneficios"], ["Planos", "#planos"], ["Dúvidas", "#faq"]].map(([l, h]) => (
            <a key={h} href={h} className="transition-colors hover:text-sun">{l}</a>
          ))}
        </nav>
        <a href="#download" className="rounded-full bg-sun px-5 py-2.5 text-sm font-bold text-ink transition-transform hover:scale-105">Baixar app ↗</a>
      </div>
    </header>
  );
}

function Hero() {
  const y = useScrollY();
  const [vh, setVh] = useState(900);
  useEffect(() => {
    const on = () => setVh(window.innerHeight);
    on(); window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  const [auto, setAuto] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0; const t0 = performance.now();
    const tick = (now: number) => { const k = Math.min((now - t0) / 8000, 1); setAuto(1 - Math.pow(1 - k, 3)); if (k < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const track = vh * 1.2;
  const p = Math.min(Math.max(y / track, 0), 1);
  const ease = 1 - Math.pow(1 - p, 2);
  const t = Math.min(auto * 0.5 + ease * 0.5, 1);
  const sceneStyle = {
    "--scene-scale": `${1 + t * 0.12}`,
    "--cristo-x": `${t * 7}vw`,
    "--title-x": `${-t * 6}vw`,
    "--title-scale": `${1 + t * 0.3}`,
    "--corcovado-mask": `url("${corcovadoMask}")`,
  } as CSSProperties;
  return (
    <div className="rio-track relative">
    <section id="top" className="rio-depth grain sticky top-0 isolate overflow-hidden bg-ink text-ink-foreground" style={sceneStyle}>
      <div className="rio-scene absolute inset-0">
        <img src={heroAsset.url} alt="Cristo Redentor e Pão de Açúcar ao amanhecer sobre a Baía de Guanabara" width={1920} height={1085} className="rio-photo" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/10 to-ink/60" />
      </div>
      <div className="rio-headline absolute inset-x-0 z-10 mx-auto max-w-7xl px-5">
        <p className="eyebrow mb-6 text-sun">Descubra o seu Rio — 22°54′S 43°10′W</p>
        <h1 className="rio-title font-display font-extrabold">
          <span className="line-mask"><span>O Rio de Janeiro</span></span>
          <span className="line-mask"><span style={{ animationDelay: ".12s" }}>na palma da <em className="font-serif-i text-sun">sua mão.</em></span></span>
        </h1>
      </div>
      <div aria-hidden="true" className="rio-scene rio-foreground pointer-events-none absolute inset-0 z-20">
        <img src={heroAsset.url} alt="" width={1920} height={1085} className="rio-photo" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/10 to-ink/60" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-ink via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-30 mx-auto w-full max-w-7xl px-5 pb-12 md:pb-16">
        <div className="grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <p className="max-w-md text-lg text-ink-foreground/80">
            Lojas, produtos, serviços e oportunidades perto de você. Descubra o comércio local e encontre tudo o que procura.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="group h-auto rounded-full bg-sun px-7 py-4 font-bold text-ink"><a href="#download">Conheça o aplicativo <span className="inline-block transition-transform group-hover:rotate-45">↗</span></a></Button>
            <Button asChild variant="outline" className="h-auto rounded-full border-ink-foreground/30 bg-transparent px-7 py-4 font-semibold text-ink-foreground backdrop-blur hover:bg-ink-foreground hover:text-ink"><a href="#planos">Nossos planos</a></Button>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

function Manifesto() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-5 py-28 md:py-44">
      <p className="eyebrow reveal mb-10 text-coral">(01) — Manifesto</p>
      <p className="reveal font-display text-4xl font-semibold leading-[1.05] md:text-7xl">
        Conectando pessoas e negócios por todo o Rio. Da padaria do bairro à loja <em className="font-serif-i text-orange">que você ainda</em> não conhece.
      </p>
    </section>
  );
}

const features = [
  { tag: "Para quem compra", title: <>Descubra o que sua cidade tem de <em className="font-serif-i">melhor.</em></>, text: "Encontre lojas, explore categorias e conheça produtos em uma experiência simples, visual e feita para aproximar você do comércio local.", img: mRed, color: "bg-coral", note: "Explore novas possibilidades" },
  { tag: "Para quem vende", title: <>Sua loja merece ser <em className="font-serif-i">vista.</em></>, text: "Apresente sua marca em uma vitrine digital, organize seus produtos e destaque o que faz seu negócio ser único.", img: mOrange, color: "bg-orange", note: "Dê visibilidade ao seu negócio" },
  { tag: "Conexão local", title: <>Mais oportunidades para o comércio da <em className="font-serif-i">região.</em></>, text: "Quem compra encontra novas opções. Quem vende ganha mais uma oportunidade de ser descoberto.", img: mSea, color: "bg-sea", note: "Uma conexão que movimenta a cidade" },
  { tag: "Para o seu negócio", title: <>Tenha mais clareza sobre sua <em className="font-serif-i">presença.</em></>, text: "Uma área pensada para o lojista administrar sua vitrine e acompanhar informações importantes da loja.", img: mViolet, color: "bg-violet", note: "Sua loja mais organizada" },
];

function Features() {
  return (
    <section className="mx-auto max-w-7xl space-y-6 px-5">
      {features.map((f, i) => (
        <article key={i} className={`reveal sticky top-24 grid min-h-[78vh] overflow-hidden rounded-[2.5rem] ${f.color} text-ink-foreground md:grid-cols-2`} style={{ top: `${96 + i * 24}px` }}>
          <div className="flex flex-col justify-between p-8 md:p-14">
            <div className="flex items-center justify-between">
              <span className="eyebrow">{f.tag}</span>
              <span className="font-display text-xl">0{i + 1}/04</span>
            </div>
            <div>
              <h3 className="font-display text-4xl font-bold leading-[0.95] md:text-6xl">{f.title}</h3>
              <p className="mt-6 max-w-md text-lg opacity-90">{f.text}</p>
              <p className="mt-8 inline-flex rounded-full border border-ink-foreground/40 px-4 py-2 text-sm font-semibold">{f.note} →</p>
            </div>
          </div>
          <div className="relative flex items-end justify-center">
            <img src={f.img} alt="" loading="lazy" className="float max-h-[70vh] w-auto object-contain drop-shadow-2xl" style={{ ["--r" as string]: i % 2 ? "2deg" : "-2deg" }} />
          </div>
        </article>
      ))}
    </section>
  );
}

function Marquee() {
  const cats = ["Informática", "Livros", "Moda", "Gamer", "Pets", "Beleza", "Casa", "Automotivos", "Ofertas"];
  const row = [...cats, ...cats];
  return (
    <section className="my-28 -rotate-2 bg-sun py-6 text-ink md:my-40">
      <div className="flex w-max marquee">
        {row.map((c, i) => (
          <span key={i} className="flex items-center font-display text-5xl font-bold md:text-7xl">
            <span className="px-8">{c}</span><span className="font-serif-i text-coral">✺</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    { img: b3, big: "0%", t: "Sem comissão por venda.", d: "Anuncie seus produtos sem pagar comissão sobre cada venda realizada." },
    { img: b1, big: "⚡", t: "Comece com facilidade.", d: "Nossa equipe orienta seu cadastro e ajuda você a começar." },
    { img: b2, big: "✦", t: "Mais perto de quem procura.", d: "Apresente sua loja para pessoas que procuram opções na sua região." },
  ];
  return (
    <section id="beneficios" className="mx-auto max-w-7xl px-5 pb-28">
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
        <h2 className="reveal font-display text-5xl font-bold leading-[0.9] md:text-8xl">Por que anunciar na <em className="font-serif-i text-coral">A Carioca?</em></h2>
        <p className="reveal max-w-sm text-lg text-muted-foreground md:justify-self-end">Tudo o que seu negócio precisa para ganhar presença e visibilidade — com identidade local.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((it, i) => (
          <div key={i} className="reveal group relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-ink text-ink-foreground" style={{ transitionDelay: `${i * 0.1}s` }}>
            <img src={it.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-[1.4s] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
            <div className="relative flex h-full flex-col justify-between p-7">
              <span className="font-display text-7xl font-extrabold text-sun">{it.big}</span>
              <div>
                <h3 className="font-display text-3xl font-bold">{it.t}</h3>
                <p className="mt-3 text-ink-foreground/75">{it.d}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const plans = [
  { n: "01", tag: "O essencial", name: "Inicial", price: 0, desc: "Para começar a ser encontrado por clientes do seu bairro.", items: ["Presença local até 1 km²", "Perfil exclusivo da loja", "Até 30 anúncios", "4 fotos por produto", "Relatório de performance"], cta: "Quero começar" },
  { n: "02", tag: "Mais visibilidade", name: "Destaque", price: 119.9, desc: "Para aparecer com mais força nas descobertas da sua região.", items: ["Tudo do Inicial", "Presença regional até 5 km²", "Até 200 anúncios", "Selo Autêntica Carioca", "Prioridade nos banners do feed"], cta: "Quero destaque", hot: true },
  { n: "03", tag: "Mais presença", name: "PRO", price: 499.9, desc: "Para marcas que querem ocupar o centro da conversa local.", items: ["Tudo do Destaque", "Alcance no Estado do RJ", "Selo PRO A Carioca", "Máximo destaque no feed", "Atendimento prioritário"], cta: "Falar com a equipe" },
];

function Plans() {
  return (
    <section id="planos" className="grain rounded-t-[3rem] bg-ink py-28 text-ink-foreground md:py-40">
      <div className="mx-auto max-w-7xl px-5">
        <p className="eyebrow reveal mb-8 text-sun">(02) — Planos para lojistas</p>
        <h2 className="reveal font-display text-5xl font-bold leading-[0.9] md:text-8xl">Escolha o espaço que seu negócio <em className="font-serif-i text-sun">merece.</em></h2>
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {plans.map((p, i) => (
            <div key={p.n} className={`reveal relative flex flex-col rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-2 ${p.hot ? "bg-sun text-ink" : "border border-ink-foreground/15 bg-ink-foreground/[0.03]"}`} style={{ transitionDelay: `${i * 0.1}s` }}>
              {p.hot && <span className="spin-slow absolute -right-4 -top-4 grid h-20 w-20 place-items-center rounded-full bg-coral text-center text-[10px] font-bold uppercase leading-tight text-ink-foreground">Mais<br />escolhido</span>}
              <div className="flex justify-between text-sm opacity-70"><span>{p.n}</span><span>{p.tag}</span></div>
              <h3 className="mt-10 font-display text-5xl font-extrabold uppercase">{p.name}</h3>
              <p className="mt-3 opacity-75">{p.desc}</p>
              <p className="mt-10 font-display text-5xl font-bold">
                {p.price === 0 ? "Gratuito" : brl(p.price)}
                {p.price > 0 && <span className="text-base font-medium opacity-60">/mês</span>}
              </p>
              <ul className="mt-8 flex-1 space-y-3 border-t border-current/15 pt-8">
                {p.items.map((it) => <li key={it} className="flex gap-3"><span className={p.hot ? "text-coral" : "text-sun"}>✓</span>{it}</li>)}
              </ul>
              <a href="#contato" className={`mt-10 rounded-full px-6 py-4 text-center font-bold transition-transform hover:scale-[1.02] ${p.hot ? "bg-ink text-ink-foreground" : "bg-ink-foreground text-ink"}`}>{p.cta} →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Range({ label, value, set, min, max, step, fmt }: { label: string; value: number; set: (n: number) => void; min: number; max: number; step: number; fmt: (n: number) => string }) {
  return (
    <label className="block">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <span className="text-ink-foreground/70">{label}</span>
        <span className="font-display text-3xl font-bold text-sun">{fmt(value)}</span>
      </div>
      <input type="range" className="slider" min={min} max={max} step={step} value={value} onChange={(e) => set(+e.target.value)} />
    </label>
  );
}

function Calculator() {
  const [sales, setSales] = useState(10000);
  const [fee, setFee] = useState(5);
  const [ads, setAds] = useState(200);
  const [plan, setPlan] = useState(1);
  const r = useMemo(() => {
    const current = (sales * fee) / 100 + ads;
    const cost = plans[plan]?.price ?? 0;
    const save = Math.max(0, current - cost);
    return { current, cost, save };
  }, [sales, fee, ads, plan]);
  return (
    <section className="bg-ink pb-28 text-ink-foreground md:pb-40">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2">
        <div className="reveal rounded-[2rem] border border-ink-foreground/15 p-8 md:p-12">
          <h2 className="font-display text-4xl font-bold md:text-5xl">Vamos fazer <em className="font-serif-i text-sun">as contas?</em></h2>
          <div className="mt-12 space-y-10">
            <Range label="Quanto sua loja vende por mês?" value={sales} set={setSales} min={0} max={100000} step={500} fmt={brl} />
            <Range label="Quanto você paga de comissão?" value={fee} set={setFee} min={0} max={25} step={1} fmt={(n) => `${n}%`} />
            <Range label="Quanto gasta com divulgação?" value={ads} set={setAds} min={0} max={5000} step={50} fmt={brl} />
          </div>
          <div className="mt-12">
            <p className="mb-4 text-ink-foreground/70">E na A Carioca? Escolha seu plano</p>
            <div className="flex gap-2 rounded-full bg-ink-foreground/5 p-1.5">
              {plans.map((p, i) => (
                <button key={p.n} onClick={() => setPlan(i)} className={`flex-1 rounded-full py-3 text-sm font-bold transition-colors ${plan === i ? "bg-sun text-ink" : "text-ink-foreground/70 hover:text-ink-foreground"}`}>{p.name}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="reveal flex flex-col justify-between rounded-[2rem] bg-sun p-8 text-ink md:p-12">
          <div>
            <p className="eyebrow">Olha quanto pode sobrar</p>
            <p className="mt-8 opacity-70">Sua economia por mês</p>
            <p className="font-display text-6xl font-extrabold leading-none md:text-8xl">{brl(r.save)}</p>
            <p className="mt-3 font-serif-i text-2xl">{brl(r.save * 12)} por ano</p>
          </div>
          <div className="mt-12 space-y-4 border-t border-ink/20 pt-8">
            <div className="flex justify-between"><span>Seus gastos atuais</span><b>{brl(r.current)}</b></div>
            <div className="flex justify-between"><span>Com a A Carioca</span><b>{brl(r.cost)}</b></div>
            <p className="pt-4 text-xs opacity-60">Simulação ilustrativa. Considere apenas comissões e gastos de divulgação que realmente deixariam de existir. A A Carioca não realiza suas vendas nem cobra comissão sobre elas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  ["Por que vender na A Carioca?", "A Carioca ajuda sua empresa a ganhar visibilidade e a ser encontrada por clientes que valorizam produtos e negócios do Rio de Janeiro."],
  ["Quem pode vender na A Carioca?", "Lojistas, empreendedores, MEIs e empresas que ofereçam produtos ou serviços compatíveis com a proposta do marketplace."],
  ["Quanto custa vender na A Carioca?", "Você pode escolher entre os planos disponíveis para lojistas. Consulte a seção de planos para comparar benefícios e valores."],
  ["Quais categorias posso vender?", "Diversas categorias, incluindo tecnologia, moda, casa e decoração, esportes e lazer, livros e muito mais."],
  ["Quando a mensalidade começa a ser cobrada?", "Após a confirmação do plano e a ativação da sua presença no marketplace. Nossa equipe explica as condições antes da contratação."],
  ["Como gerencio minha conta de lojista?", "Após o cadastro, nossa equipe entra em contato, guiando e orientando você sobre o uso da plataforma."],
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto grid max-w-7xl gap-12 px-5 py-28 md:grid-cols-[1fr_1.4fr] md:py-40">
      <div>
        <p className="eyebrow reveal mb-8 text-coral">(03) — Tire suas dúvidas</p>
        <h2 className="reveal font-display text-5xl font-bold leading-[0.9] md:text-7xl">Perguntas <em className="font-serif-i text-coral">frequentes</em></h2>
        <a href="#contato" className="reveal mt-10 inline-flex rounded-full bg-ink px-6 py-4 font-bold text-ink-foreground">Falar com o suporte →</a>
      </div>
      <div className="border-t border-border">
        {faqs.map(([q, a], i) => (
          <div key={i} className="border-b border-border">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-6 py-7 text-left">
              <span className="font-display text-xl font-semibold md:text-2xl">{q}</span>
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-xl transition-transform duration-500 ${open === i ? "rotate-45 bg-sun" : ""}`}>+</span>
            </button>
            <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"}`}>
              <p className="overflow-hidden text-lg text-muted-foreground">{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contato" className="grain relative overflow-hidden bg-coral text-ink-foreground">
      <div id="download" className="mx-auto max-w-7xl px-5 pt-28">
        <p className="eyebrow">Bora?</p>
        <a href="#top" className="group mt-6 block font-display text-5xl font-bold leading-[0.9] md:text-8xl">
          Coloque sua loja <em className="font-serif-i">no mapa</em> <span className="inline-block transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4">↗</span>
        </a>
        <div className="mt-20 flex flex-wrap justify-between gap-6 border-t border-ink-foreground/30 py-8 text-sm">
          <span>© 2026 A Carioca — O Rio mais perto de você.</span>
          <span className="flex gap-6"><a href="#sobre">Sobre</a><a href="#planos">Planos</a><a href="#faq">Termos e políticas</a></span>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[24vw] font-extrabold leading-[0.75] opacity-20">A Carioca</p>
    </footer>
  );
}

