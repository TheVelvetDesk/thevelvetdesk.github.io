import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Composition, Easing, Img, Sequence, continueRender, delayRender, interpolate, registerRoot, staticFile, useCurrentFrame} from 'remotion';

const ink = '#110b0e';
const cream = '#f1e8dc';
const gold = '#c8a36d';
const serif = '"Velvet Playfair", Georgia, serif';
const mono = '"Courier New", monospace';
const asset = (name) => staticFile(`media/ad-creative/${name}`);
const ease = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(.22, 1, .36, 1)};
const projects = [
  {brand: 'Poppy & Pout', product: 'Roxie Lip Tint', image: 'poppy-pout.webp'},
  {brand: 'Poppy & Pout', product: 'Roxie Lip Tint', image: 'poppy-pout-more.webp'},
  {brand: 'Supergoop!', product: 'Glowscreen', image: 'supergoop-coffee.webp'},
  {brand: 'Supergoop!', product: 'Unseen Sunscreen', image: 'supergoop-gel.webp'},
  {brand: 'The Earthling Co.', product: 'Citrus Sun Shampoo Bar', image: 'earthling.webp'},
  {brand: 'Experiment', product: 'Super Saturated', image: 'experiment.webp'},
  {brand: 'cocokind', product: 'Ceramide Lip Blur Balm', image: 'cocokind.webp'},
];

function Reveal({children, delay = 0, style = {}}) {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [delay, delay + 22], [0, 1], ease);
  return <div style={{opacity: progress, transform: `translateY(${(1 - progress) * 28}px)`, ...style}}>{children}</div>;
}

function Opening() {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{alignItems: 'center', paddingTop: 138}}>
    <Reveal><div style={{fontFamily: serif, fontSize: 110, letterSpacing: -5, lineHeight: 1}}>Ad creative.</div></Reveal>
    <div style={{display: 'flex', gap: 34, marginTop: 94, alignItems: 'center'}}>
      {[projects[3], projects[0], projects[5]].map((project, i) => <Reveal delay={10 + i * 4} key={project.image}>
        <Img src={asset(project.image)} style={{display: 'block', width: i === 1 ? 300 : 263, height: 'auto', boxShadow: '0 20px 65px #0009', transform: `rotate(${(i - 1) * 7}deg) translateY(${i === 1 ? -12 : 16}px)`}} />
      </Reveal>)}
    </div>
    {['left', 'right'].map((side) => <div key={side} style={{position: 'absolute', top: 0, bottom: 0, [side]: 0, width: '50%', background: 'linear-gradient(90deg, #170a10, #52132a 50%, #210b14)', transform: `translateX(${interpolate(frame, [0, 28], [0, side === 'left' ? -101 : 101], ease)}%)`}} />)}
  </AbsoluteFill>;
}

function Study({project, index}) {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 20], [65, 0], ease);
  const opacity = interpolate(frame, [0, 10, 71, 77], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{opacity, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '112px 125px', gap: 100}}>
    <div style={{width: 480}}>
      <Reveal><p style={{fontFamily: mono, color: gold, fontSize: 17, letterSpacing: 3, margin: '0 0 28px'}}>0{index + 1} / CONCEPT STUDY</p></Reveal>
      <Reveal delay={3}><h1 style={{fontFamily: serif, fontWeight: 500, fontSize: project.brand.length > 14 ? 80 : 91, lineHeight: 1.06, letterSpacing: -4, margin: 0}}>{project.brand}</h1></Reveal>
      <Reveal delay={9}><div style={{width: 75, height: 1, background: gold, margin: '35px 0'}} /><p style={{fontFamily: mono, fontSize: 18, lineHeight: 1.7, color: '#c5b6aa', margin: 0}}>{project.product}</p></Reveal>
    </div>
    <Img src={asset(project.image)} style={{width: 528, height: 660, objectFit: 'contain', boxShadow: '0 24px 70px #0008', transform: `translateX(${x}px) scale(${interpolate(frame, [0, 78], [1, 1.015])})`}} />
  </AbsoluteFill>;
}

function Closing() {
  return <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
    <Reveal><h1 style={{fontFamily: serif, fontSize: 134, lineHeight: 1.02, letterSpacing: -6, fontWeight: 500, margin: 0, textAlign: 'center'}}>Your brand.<br /><em style={{color: gold}}>Next.</em></h1></Reveal>
    <Reveal delay={12}><p style={{margin: '42px 0 0', fontFamily: mono, fontSize: 19, letterSpacing: 2, color: '#c5b6aa'}}>THEVELVETDESK.ORG</p></Reveal>
  </AbsoluteFill>;
}

function Film() {
  const frame = useCurrentFrame();
  const [handle] = useState(() => delayRender('Load brand typography'));
  useEffect(() => {
    const regular = new FontFace('Velvet Playfair', `url(${asset('playfair.ttf')})`, {weight: '500'});
    const italic = new FontFace('Velvet Playfair', `url(${asset('playfair-italic.ttf')})`, {weight: '500', style: 'italic'});
    Promise.all([regular.load(), italic.load()]).then((fonts) => {fonts.forEach((font) => document.fonts.add(font)); continueRender(handle);}).catch((error) => {console.error(error); continueRender(handle);});
  }, [handle]);
  return <AbsoluteFill style={{backgroundColor: ink, color: cream, overflow: 'hidden'}}>
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 76% 48%, #62182f80, transparent 65%), repeating-linear-gradient(96deg, #0000 0px, #0002 68px, #63172b12 105px, #0000 180px)', transform: `scale(1.1) translateX(${frame / 150}px)`}} />
    <div style={{position: 'absolute', inset: 35, border: '1px solid #c8a36d40'}} />
    <div style={{position: 'absolute', left: 68, right: 68, top: 59, display: 'flex', justifyContent: 'space-between', font: `15px ${mono}`, letterSpacing: 2, color: gold}}><span>THE VELVET DESK</span><span>AD CREATIVE</span></div>
    <Sequence durationInFrames={72}><Opening /></Sequence>
    {projects.map((project, index) => <Sequence key={project.image} from={72 + index * 78} durationInFrames={78}><Study project={project} index={index} /></Sequence>)}
    <Sequence from={618} durationInFrames={54}><Closing /></Sequence>
    <div style={{position: 'absolute', bottom: 59, left: 68, right: 68, display: 'flex', justifyContent: 'space-between', color: '#baa79d', font: `13px ${mono}`, letterSpacing: 1.2}}><span>INDEPENDENT CONCEPTS · NO BRAND AFFILIATION</span><span>CONCEPT / COPY / DESIGN</span></div>
    <div style={{position: 'absolute', bottom: 35, left: 35, width: `${(frame / 671) * (1370 / 1440) * 100}%`, height: 1, background: gold}} />
  </AbsoluteFill>;
}

const Root = () => <Composition id="AdCreative" component={Film} durationInFrames={672} fps={24} width={1440} height={900} />;
registerRoot(Root);
