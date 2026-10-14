(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,[43432,63488,e=>{var t=e.i(75254);let a=(0,t.f)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]);e.s(["f",0,a],43432);let s=(0,t.f)("mail",[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]);e.s(["f",0,s],63488)},63178,e=>{var t=e.i(71645),a=(e,t,a,s,r,i,n,l)=>{let o=document.documentElement,c=["light","dark"];function d(t){var a;(Array.isArray(e)?e:[e]).forEach(e=>{let a="class"===e,s=a&&i?r.map(e=>i[e]||e):r;a?(o.classList.remove(...s),o.classList.add(i&&i[t]?i[t]:t)):o.setAttribute(e,t)}),a=t,l&&c.includes(a)&&(o.style.colorScheme=a)}if(s)d(s);else try{let e=localStorage.getItem(t)||a,s=n&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;d(s)}catch(e){}};t.createContext(void 0),t.memo(e=>{let{forcedTheme:s,storageKey:r,attribute:i,enableSystem:n,enableColorScheme:l,defaultTheme:o,value:c,themes:d,nonce:m,scriptProps:h}=e,u=JSON.stringify([i,r,o,s,d,c,n,l]).slice(1,-1);return t.createElement("script",{...h,suppressHydrationWarning:!0,nonce:"u"<typeof window?m:"",dangerouslySetInnerHTML:{__html:`(${a.toString()})(${u})`}})}),e.s([])},78392,e=>{var t=e.i(43476),a=e.i(70521),s=e.i(15267),r=e.i(71645),i=e.i(22016),n=e.i(18566),l=e.i(98194),o=e.i(43432),c=e.i(63488),d=e.i(75254);let m=(0,d.f)("menu",[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]]),h=(0,d.f)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var u=e.i(90597),x=e.i(65375);function g(e){let{language:a="de"}=e,[s,i]=(0,r.useState)(!1),n={de:{text:"Wir nutzen Google Analytics.",accept:"Akzeptieren",decline:"Ablehnen"},en:{text:"We use Google Analytics.",accept:"Accept",decline:"Decline"},fr:{text:"Nous utilisons Google Analytics.",accept:"Accepter",decline:"Refuser"}}[a];(0,r.useEffect)(()=>{let e=localStorage.getItem("ga-consent");null===e?i(!0):"accepted"===e?l():"declined"===e&&i(!0)},[a]);let l=()=>{if(!window.gtag){let e=document.createElement("script");e.async=!0,e.src="https://www.googletagmanager.com/gtag/js?id=G-5QH0CNQ1BK",document.head.appendChild(e);let t=document.createElement("script");t.innerHTML=`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-5QH0CNQ1BK', { anonymize_ip: true });
      `,document.head.appendChild(t)}};return s?(0,t.jsxs)("div",{style:{position:"fixed",bottom:20,left:20,right:20,background:"#222",color:"#fff",padding:15,borderRadius:8,textAlign:"center",zIndex:9999,fontFamily:"sans-serif"},children:[n.text,(0,t.jsx)("button",{onClick:()=>{localStorage.setItem("ga-consent","accepted"),l(),i(!1)},style:{marginLeft:10,padding:"5px 10px"},children:n.accept}),(0,t.jsx)("button",{onClick:()=>{localStorage.setItem("ga-consent","declined"),i(!0)},style:{marginLeft:5,padding:"5px 10px"},children:n.decline})]}):null}e.i(63178);let f={de:{home:"Startseite",collection:"Kollektion",about:"Über uns",contact:"Kontakt",phone:"Telefon",email:"E-Mail",tagline:"Exquisite Edelsteine von außergewöhnlicher Qualität",seo_description:"NobleCutGems - Premium Edelsteine von außergewöhnlicher Qualität. Zertifizierte Diamanten, Rubine, Saphire und Smaragde aus aller Welt. Professionelle Beratung und IGS-Zertifizierung.",company_name:"NobleCutGems",wishlist:"Wishlist",blog:"Journal"},en:{home:"Home",collection:"Collection",about:"About Us",contact:"Contact",phone:"Phone",email:"Email",tagline:"Exquisite Gemstones of Extraordinary Quality",seo_description:"NobleCutGems - Premium gemstones of extraordinary quality. Certified diamonds, rubies, sapphires and emeralds from around the world. Professional consultation and IGS certification.",company_name:"NobleCutGems",wishlist:"Wishlist",blog:"Journal"},fr:{home:"Accueil",collection:"Collection",about:"À propos",contact:"Contact",phone:"Téléphone",email:"E-mail",tagline:"Pierres précieuses exquises d'une qualité extraordinaire",seo_description:"NobleCutGems - Pierres précieuses premium d'une qualité extraordinaire. Diamants, rubis, saphirs et émeraudes certifiés du monde entier. Consultation professionnelle et certification IGS.",company_name:"NobleCutGems",wishlist:"Wishlist",blog:"Journal"}},p=[{key:"home",url:"Home"},{key:"collection",url:"Collection"},{key:"about",url:"About"},{key:"contact",url:"Contact"},{key:"blog",url:"blog"}];e.s(["default",0,function(e){let{children:d,lang:y}=e,b=(0,n.usePathname)(),j=(0,n.useRouter)(),[v,w]=(0,r.useState)(y||"de"),[N,k]=(0,r.useState)(!1),C=(0,r.useRef)(null),S=f[v]||f.de,A=(0,x.useWishlist)(),E=A?.wishlist?.length||0;(0,r.useEffect)(()=>{y&&f[y]&&(w(y),localStorage.setItem("language",y))},[y]),(0,r.useEffect)(()=>{let e=e=>{N&&C.current&&!C.current.contains(e.target)&&k(!1)};return N&&document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[N]);let G=()=>(0,t.jsx)("div",{className:"flex items-center gap-1 bg-black/5 backdrop-blur-sm rounded-full p-1",children:Object.keys(f).map(e=>(0,t.jsx)("button",{onClick:()=>{let t;return w(e),localStorage.setItem("language",e),t=b.replace(`/${v}`,`/${e}`),void(j.push(t||`/${e}`),window.dispatchEvent(new CustomEvent("languageChange",{detail:e})))},className:`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${v===e?"bg-white text-gray-900 shadow-sm":"text-gray-600 hover:text-gray-900"}`,children:e.toUpperCase()},e))});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        :root {
          --bg-color: #fefefe;
          --text-color: #1a1a1a;
          --primary-color: #1a73e8;
          --cta-color: #ff6f00;
          --success: #4caf50;
          --primary-dark: #1a1a1a;
          --pearl-white: #fefefe;
          --champagne: #f7f3e9;
          --warm-gray: #8b7355;
        }

        
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--pearl-white);
          color: var(--primary-dark);
          line-height: 1.6;
        }
        
        .serif-heading {
          font-family: 'Playfair Display', serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        
        .luxury-nav {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .nav-link {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 50%;
          background: var(--primary-color);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }
        
        .scroll-indicator {
          background: linear-gradient(90deg, transparent 0%, var(--primary-color) 50%, transparent 100%);
          height: 1px;
        }
        
        .primary-btn {
          background: var(--primary-color);
        }
        
        .primary-btn:hover {
          background: #1557b0;
        }
        
        .cta-btn {
          background: var(--cta-color);
        }
        
        .cta-btn:hover {
          background: #e65100;
        }
        
        .success-color {
          color: var(--success);
        }
      `}),(0,t.jsxs)("div",{className:"min-h-screen bg-gradient-to-b from-pearl-white to-champagne",children:[(0,t.jsx)("header",{className:"luxury-nav fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex items-center justify-between h-20",children:[(0,t.jsx)("div",{className:"flex items-center space-x-4 mx-auto lg:mx-0",children:(0,t.jsxs)(i.default,{href:(0,a.f)("Home",v),className:"flex items-center space-x-3",children:[(0,t.jsx)(l.default,{src:"/images/logo1.jpg",width:48,height:48,alt:"NobleCutGems logo",className:"h-10 lg:h-12"}),(0,t.jsx)("span",{className:"serif-heading text-2xl font-bold lg:hidden",children:S.company_name}),(0,t.jsxs)("div",{className:"hidden lg:flex flex-col",children:[(0,t.jsx)("span",{className:"serif-heading text-3xl font-bold",children:S.company_name}),(0,t.jsx)("span",{className:"text-xs tracking-wide mt-1 text-gray-600",children:"Premium Gemstones"})]})]})}),(0,t.jsxs)("div",{className:"hidden lg:flex items-center gap-8",children:[(0,t.jsxs)("nav",{className:"flex items-center gap-8",children:[p.map(e=>(0,t.jsx)(i.default,{href:(0,a.f)(e.url,v),className:`nav-link text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${b===(0,a.f)(e.url,v)?"active text-gray-900":"text-gray-600 hover:text-gray-900"}`,children:S[e.key]},e.key)),(0,t.jsxs)(i.default,{href:`/${v}/wishlist`,onClick:()=>k(!1),className:"text-lg font-medium text-cta-color flex items-center gap-2",children:[(0,t.jsx)(u.f,{className:"w-5 h-5"}),S.wishlist," (",E,")"]})]}),(0,t.jsx)(G,{})]}),(0,t.jsxs)("div",{className:"lg:hidden relative",ref:C,children:[(0,t.jsx)(s.f,{variant:"ghost",size:"icon",onClick:()=>k(!N),children:N?(0,t.jsx)(h,{className:"w-6 h-6"}):(0,t.jsx)(m,{className:"w-6 h-6"})}),N&&(0,t.jsxs)("div",{className:"\r\n\n                      fixed\r\n\n                      left-0 right-0\r\n\n                      top-20  /* Direkt unter dem Header (h-20 = 5rem ≈ 80px) */\r\n\n                      z-40\r\n\n                      bg-white/95\r\n\n                      backdrop-blur-lg\r\n\n                      border-t border-gray-100\r\n\n                      px-6 py-8\r\n\n                      space-y-6\r\n\n                      overflow-visible  /* Stellt sicher, dass nichts abgeschnitten wird */\r\n\n                      min-h-[300px]    /* Mindesthöhe, um alle Items sichtbar zu machen; passe an */\r\n\n                    ",children:[(0,t.jsx)("nav",{className:"flex flex-col items-center gap-6",children:p.map(e=>(0,t.jsx)(i.default,{href:(0,a.f)(e.url,v),onClick:()=>k(!1),className:"text-lg font-medium text-gray-900 hover:text-primary-color transition-colors duration-300",children:S[e.key]},e.key))}),(0,t.jsxs)("div",{className:"border-t border-gray-200 pt-6 space-y-4 text-center text-sm text-gray-600",children:[(0,t.jsxs)("div",{className:"flex items-center justify-center gap-2",children:[(0,t.jsx)(o.f,{className:"w-4 h-4"}),(0,t.jsx)("span",{children:"+49 (0) 151 6848 2909"})]}),(0,t.jsxs)("div",{className:"flex items-center justify-center gap-2",children:[(0,t.jsx)(c.f,{className:"w-4 h-4"}),(0,t.jsx)("span",{children:"info@noblecutgems.com"})]}),(0,t.jsx)("div",{className:"flex justify-center",children:(0,t.jsx)(G,{})})]})]})]})]})})}),(0,t.jsx)("main",{children:d}),(0,t.jsx)(g,{language:v}),(0,t.jsx)("footer",{className:"bg-primary-dark text-pearl-white mt-32",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-6 lg:px-8 py-16",children:(0,t.jsxs)("div",{className:"grid md:grid-cols-4 gap-12",children:[(0,t.jsxs)("div",{className:"md:col-span-2 text-center md:text-left",children:[(0,t.jsx)("div",{className:"serif-heading text-3xl font-bold mb-4",children:S.company_name}),(0,t.jsx)("p",{className:"text-gray-600 mb-6 max-w-md leading-relaxed mx-auto md:mx-0",children:S.tagline}),(0,t.jsx)("div",{className:"flex gap-4 justify-center md:justify-start",children:(0,t.jsx)(G,{})})]}),(0,t.jsxs)("div",{className:"text-center md:text-left",children:[(0,t.jsx)("h3",{className:"font-semibold mb-4",style:{color:"var(--primary-color)"},children:"Navigation"}),(0,t.jsxs)("div",{className:"space-y-3",children:[(0,t.jsx)(i.default,{href:(0,a.f)("Impressum",v),className:"block text-gray-600 hover:text-white transition-colors duration-300",children:"Impressum"}),(0,t.jsx)(i.default,{href:(0,a.f)("Datenschutz",v),className:"block text-gray-600 hover:text-white transition-colors duration-300",children:"Datenschutz"}),(0,t.jsx)(i.default,{href:(0,a.f)("AGB",v),className:"block text-gray-600 hover:text-white transition-colors duration-300",children:"AGB"})]})]}),(0,t.jsxs)("div",{className:"text-center md:text-left",children:[(0,t.jsx)("h3",{className:"font-semibold mb-4",style:{color:"var(--primary-color)"},children:S.contact}),(0,t.jsxs)("div",{className:"space-y-3 text-gray-600",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 justify-center md:justify-start",children:[(0,t.jsx)(o.f,{className:"w-4 h-4"}),(0,t.jsx)("span",{children:"+49 (0) 151 68482909"})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2 justify-center md:justify-start",children:[(0,t.jsx)(c.f,{className:"w-4 h-4"}),(0,t.jsx)("span",{children:"info@noblecutgems.com"})]})]})]})]})})})]})]})}],78392)},91782,e=>{e.i(43476),e.i(71645),e.i(63178),e.s([])},70521,e=>{e.s(["f",0,function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"de",a=e.toLowerCase(),s=a;return"home"===a?`/${t}`:("datenschutz"===a&&(s="privacy"),"impressum"===a&&(s="imprint"),"about"===a&&(s="about"),"contact"===a&&(s="contact"),"agb"===a&&(s="agb"),`/${t}/${s}`)}])}],18566,(e,t,a)=>{t.exports=e.r(76562)}]);