// Decorative airport scenes, not depictions of the actual terminal buildings.
export default function AirportIllustration({ code }) {
  const gradient = `airport-sky-${code}`;
  return <svg className="airport-illustration" viewBox="0 0 240 170" fill="none" aria-hidden="true">
    <defs><linearGradient id={gradient} x1="120" y1="15" x2="120" y2="145" gradientUnits="userSpaceOnUse"><stop stopColor="#EDF5FF" /><stop offset="1" stopColor="#EDF5FF" stopOpacity="0" /></linearGradient></defs>
    <path d="M26 126V94a94 94 0 0 1 188 0v32H26Z" fill={`url(#${gradient})`} />
    <path d="M36 53h30a9 9 0 0 0-17-4 7 7 0 0 0-13 4ZM145 35h24a7 7 0 0 0-13-4 6 6 0 0 0-11 4Z" fill="white" />
    {code === 'PUS' && <><path d="m20 117 41-53 37 53H20Z" fill="#DBE8EF" /><path d="m67 117 46-66 48 66H67Z" fill="#CDDDE9" /><path d="m101 69 12-18 13 18-13-4-12 4Z" fill="#ECF3F9" /></>}
    {code === 'ICN' && <><path d="M16 126c28-16 43 14 71 0s43 13 70 0 44 10 68 0v15H16v-15Z" fill="#D8EAF5" /><path d="M23 139c27-14 42 12 70 0s43 12 70 0 40 8 57 0" stroke="#B8D4E9" strokeWidth="2" /><path d="M151 96h61m-50 0V68m40 28V68m-40 0c12 24 28 24 40 0" stroke="#C1D6E6" strokeWidth="3" /></>}
    {code === 'GMP' && <g fill="#D6E3EF"><path d="M27 118V80h20v38H27Zm25 0V65h25v53H52Zm31 0V87h20v31H83Zm95 0V76h18v42h-18Zm24 0V61h16v57h-16Z" /><path d="M57 59h15v6H57Z" fill="#BDCEDD" /><path d="M34 90h6m19-13h11m-11 12h11m113-2h7m19-12h4" stroke="#F5F9FD" strokeWidth="3" /></g>}
    {code === 'CJU' && <><path d="M20 125c22-10 34-5 58-14l41-45 40 45c23 8 39 4 61 14H20Z" fill="#D0E2E8" /><path d="m108 79 11-13 12 13-12-3-11 3Z" fill="#F7FAFC" /><path d="M17 136c28-13 44 11 70 0s44 12 71 0 42 9 65 0" stroke="#B8D4E9" strokeWidth="3" /><path d="M193 121v-23m0 2c-12-10-17-3-17-3m17 3c8-14 17-8 17-8m-17 8c12-3 17 5 17 5" stroke="#93B5B9" strokeWidth="3" strokeLinecap="round" /></>}
    <ellipse cx="120" cy="144" rx="82" ry="7" fill="#D8E5F0" fillOpacity=".6" />
    <path d="M61 110h103v28H61v-28Z" fill="#C7DCEE" /><path d="m164 110 24 8v20h-24v-28Z" fill="#ADC8E0" /><path d="m61 110 27-12h76l24 20-24-8H61Z" fill="#E5EFF8" />
    <path d="M57 110h110" stroke="#6D93B7" strokeWidth="4" strokeLinecap="round" />
    <path d="M71 117h10v15H71zm16 0h10v15H87zm16 0h10v15h-10zm16 0h10v15h-10zm16 0h10v15h-10zm16 0h6v15h-6z" fill="#6E9CC3" />
    <path d="M46 88h13v50H46V88Z" fill="#B0CDE4" /><path d="M52 88h7v50h-7V88Z" fill="#91B4D3" /><path d="m40 73 25 0-4 18H44l-4-18Z" fill="#517B9F" /><path d="M44 77h17l-2 8H46l-2-8Z" fill="#B9DEEE" /><path d="M39 72h27m-14-2V60" stroke="#385E80" strokeWidth="3" strokeLinecap="round" />
    <path d="m146 65 13-8-14-8 5-3 20 4 16-9c5-3 11-1 9 2l-20 15-5 19-5 3-1-15-13 6-5-6Z" fill="#123C65" />
    <path d="M58 141h133" stroke="#8EAEC9" strokeWidth="2" strokeLinecap="round" />
  </svg>;
}
