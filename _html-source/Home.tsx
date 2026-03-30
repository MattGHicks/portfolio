const imgArrow = "http://localhost:3845/assets/39294e7c1b0b54578f0c44c9c2bca04922a64dd7.svg";
const imgArrow1 = "http://localhost:3845/assets/817c970cd4ec3993b4ee9672976c34ed6033a559.svg";
const img = "http://localhost:3845/assets/d33dff136c5e35429036077124c7b5a56d3f5546.svg";

function NavigationMainNavigation({ className }: { className?: string }) {
  return (
    <div className={className || "backdrop-blur-[2.5px] bg-[rgba(255,255,255,0.01)] border-[var(--color\\/brand\\/brown-dark,#2d2a25)] border-b border-solid content-stretch flex flex-col h-[56px] items-center pb-px px-[var(--sizing\\/spacing\\/page\\/page-margin,192px)] relative w-[1440px]"} data-name="Navigation - Main navigation" data-node-id="10019:1309">
      <div className="flex-[1_0_0] max-w-[1056px] min-h-px min-w-px relative w-full" data-name="Container" data-node-id="10001:3227">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] pb-[10.5px] pt-[11.5px] relative size-full">
          <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link" data-node-id="10001:3228">
            <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:Bold',sans-serif)] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/light-bg,#f3f0ea)] text-[length:var(--size\/header\/h6,20px)] whitespace-nowrap" data-node-id="10001:3229">
              <p className="leading-[1.4]">Matt Hicks</p>
            </div>
          </div>
          <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="List" data-node-id="10001:3230">
            <div className="content-stretch flex items-center relative shrink-0" data-name="Link" data-node-id="10011:2246">
              <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Regular',sans-serif)] font-normal justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-medium,#5a564f)] text-[length:var(--size\/body\/body-sm,14px)] whitespace-nowrap" data-node-id="10011:2247" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="leading-[1.5]">Work</p>
              </div>
            </div>
            <div className="content-stretch flex items-center relative shrink-0" data-name="Link" data-node-id="10011:2249">
              <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Regular',sans-serif)] font-normal justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-medium,#5a564f)] text-[length:var(--size\/body\/body-sm,14px)] whitespace-nowrap" data-node-id="10011:2250" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="leading-[1.5]">About</p>
              </div>
            </div>
            <div className="border border-[var(--color\/brand\/brown-medium,#5a564f)] border-solid content-stretch flex gap-[6px] items-center justify-center px-[14px] py-[6px] relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button" data-node-id="10017:2370">
              <p className="font-[family-name:var(--font-family\/body,'DM_Sans:9pt_Regular',sans-serif)] font-normal leading-[1.5] relative shrink-0 text-[13px] text-[color:var(--color\/brand\/brown-light,#79746b)]" data-node-id="I10017:2370;2:546" style={{ fontVariationSettings: "'opsz' 9" }}>
                Resume
              </p>
              <div className="content-stretch flex items-center justify-center relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0 size-[16px]" data-name="Button/Link/False/False/Only" data-node-id="I10017:2370;10017:2015">
                <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="arrow-right" data-node-id="I10017:2370;10017:2015;2:509">
                  <div className="absolute flex inset-[21.88%_6.25%] items-center justify-center">
                    <div className="-rotate-90 flex-none h-[14px] w-[9px]">
                      <div className="relative size-full" data-name="arrow" data-node-id="I10017:2370;10017:2015;2:509;1287:7357">
                        <img alt="" className="absolute block max-w-none size-full" src={imgArrow} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Home - 1440" data-node-id="10001:3224" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1440 4181\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.1899999976158142\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(58.7 0.90001 -5.9469 387.86 1060.5 1242.5)\\'><stop stop-color=\\'rgba(13,153,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(13,153,255,0)\\' offset=\\'0.65\\'/></radialGradient></defs></svg>'), linear-gradient(90deg, rgb(26, 25, 23) 0%, rgb(26, 25, 23) 100%)" }}>
      <div className="bg-gradient-to-r content-stretch flex flex-col from-[0.694%] from-[var(--color\/brand\/dark-bg,rgba(17,17,16,0.82))] items-start relative shrink-0 to-[rgba(17,17,16,0)]" data-node-id="10017:1617">
        <NavigationMainNavigation className="backdrop-blur-[2.5px] bg-[rgba(255,255,255,0.01)] border-[var(--color\/brand\/brown-dark,#2d2a25)] border-b border-solid content-stretch flex flex-col h-[56px] items-center pb-px px-[var(--sizing\/spacing\/page\/page-margin,192px)] relative shrink-0 w-[1440px]" />
        <div className="content-stretch flex flex-col h-[876px] items-center justify-center min-h-[640px] overflow-clip px-[var(--sizing\/spacing\/page\/page-margin,192px)] py-[var(--sizing\/spacing\/spacing\/xxxl,112px)] relative shrink-0 w-[1440px]" data-name="Section - Introduction" data-node-id="10001:3238">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--sizing\/spacing\/spacing\/m,24px)] items-start justify-center max-w-[1056px] min-h-px min-w-px relative w-full" data-name="Container" data-node-id="10001:3243">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container" data-node-id="10001:3244">
              <div className="border border-[var(--color\/grayscale\/white,white)] border-solid content-stretch flex items-center justify-center p-px relative rounded-[2px] shrink-0 size-[14px]" data-name="Border" data-node-id="10001:3245">
                <div className="flex flex-col font-['JetBrains_Mono:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[8px] text-[color:var(--color\/grayscale\/white,white)] text-center tracking-[0.88px] uppercase whitespace-nowrap" data-node-id="10001:3246">
                  <p className="leading-[normal]">F</p>
                </div>
              </div>
              <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] tracking-[0.55px] whitespace-nowrap" data-node-id="10001:3247">
                <p className="leading-[normal]">PORTFOLIO · 2026</p>
              </div>
            </div>
            <div className="content-stretch flex gap-[7px] h-[12px] items-center relative shrink-0 w-full" data-name="Container" data-node-id="10001:3248">
              <div className="bg-[var(--color\/brand\/green,#68b99a)] rounded-[3.5px] shadow-[0px_0px_10px_0px_rgba(35,197,98,0.65)] shrink-0 size-[7px]" data-name="Background+Shadow" data-node-id="10001:3249" />
              <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/green,#68b99a)] tracking-[0.55px] whitespace-nowrap" data-node-id="10001:3250">
                <p className="leading-[normal]">Open to new opportunities</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Heading 1 - Matt Hicks, Product Designer" data-node-id="10001:3251">
              <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-name="Container" data-node-id="10001:3252">
                <div className="flex flex-[1_0_0] flex-col font-[family-name:var(--font-family\/heading,'Syne:ExtraBold',sans-serif)] font-extrabold justify-center leading-[0] min-h-px min-w-px relative text-[116px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)]" data-node-id="10001:3253">
                  <p className="leading-[80.95px] whitespace-pre-wrap">Matt</p>
                </div>
              </div>
              <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-name="Container" data-node-id="10001:3254">
                <div className="flex flex-[1_0_0] flex-col font-[family-name:var(--font-family\/heading,'Syne:ExtraBold',sans-serif)] font-extrabold h-[92px] justify-end leading-[0] min-h-px min-w-px relative text-[116px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)]" data-node-id="10001:3255">
                  <p className="leading-[80.95px] whitespace-pre-wrap">Hicks</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start max-w-[480px] relative shrink-0 w-full" data-name="Container" data-node-id="10001:3256">
              <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-[family-name:var(--font-family\/body,'DM_Sans:Regular',sans-serif)] font-normal justify-center leading-[0] relative shrink-0 text-[0px] text-[18px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full whitespace-pre-wrap" data-node-id="10001:3257" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="mb-0">
                  <span className="leading-[1.5]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    UI/UX Designer
                  </span>
                  <span className="leading-[1.5] text-[#5a564f]" style={{ fontVariationSettings: "'opsz' 14" }}>{` fluent in Figma — design systems, AI-`}</span>
                </p>
                <p className="leading-[1.5] text-[#5a564f]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  augmented workflows, and 170+ shipped government websites. Based in Tampa, FL. Available remote.
                </p>
              </div>
            </div>
            <div className="content-stretch flex gap-[var(--sizing\/spacing\/spacing\/xs,12px)] items-start pt-[var(--sizing\/spacing\/spacing\/m-l,32px)] relative shrink-0 w-full" data-name="Actions" data-node-id="10001:3258">
              <div className="bg-[var(--color\/brand\/blue,#5b8feb)] border border-[var(--color\/brand\/blue,#5b8feb)] border-solid content-stretch flex items-center justify-center px-[20px] py-[12px] relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button" data-node-id="10017:1667">
                <p className="font-[family-name:var(--font-family\/body,'DM_Sans:SemiBold',sans-serif)] font-semibold leading-[1.5] relative shrink-0 text-[14px] text-[color:var(--color\/brand\/brown-lightest,#dad6cc)]" data-node-id="I10017:1667;2:441" style={{ fontVariationSettings: "'opsz' 14" }}>
                  View Work
                </p>
              </div>
              <div className="border border-[var(--color\/brand\/brown-medium,#5a564f)] border-solid content-stretch flex gap-[6px] items-center justify-center px-[20px] py-[12px] relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button" data-node-id="10017:1661">
                <p className="font-[family-name:var(--font-family\/body,'DM_Sans:9pt_Regular',sans-serif)] font-normal leading-[1.5] relative shrink-0 text-[14px] text-[color:var(--color\/brand\/brown-light,#79746b)]" data-node-id="I10017:1661;2:536" style={{ fontVariationSettings: "'opsz' 9" }}>
                  Download Resume
                </p>
                <div className="content-stretch flex items-center justify-center relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0 size-[16px]" data-name="Button/Link/False/False/Only" data-node-id="I10017:1661;10017:2020">
                  <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="arrow-right" data-node-id="I10017:1661;10017:2020;2:509">
                    <div className="absolute flex inset-[21.88%_6.25%] items-center justify-center">
                      <div className="-rotate-90 flex-none h-[14px] w-[9px]">
                        <div className="relative size-full" data-name="arrow" data-node-id="I10017:1661;10017:2020;2:509;1287:7357">
                          <img alt="" className="absolute block max-w-none size-full" src={imgArrow} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Scroll Label" data-node-id="10001:3239">
            <div className="bg-[var(--color\/brand\/brown-dark,#2d2a25)] h-px shrink-0 w-[32px]" data-name="Horizontal Divider" data-node-id="10001:3240" />
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="10001:3241">
              <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] tracking-[0.55px] whitespace-nowrap" data-node-id="10001:3242">
                <p className="leading-[normal]">SCROLL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color\/brand\/light-bg,#f3f0ea)] content-stretch flex flex-col gap-[var(--sizing\/spacing\/spacing\/xxl,80px)] items-center overflow-clip px-[var(--sizing\/spacing\/page\/page-margin,192px)] py-[var(--sizing\/spacing\/spacing\/xxxl,112px)] relative shrink-0 w-full" data-name="Section - Introduction" data-node-id="10001:3261">
        <div className="content-stretch flex flex-col gap-[56px] items-start max-w-[1056px] overflow-clip relative shrink-0 w-full" data-name="Container" data-node-id="10001:3266">
          <div className="border-[var(--color\/brand\/brown-lightest,#dad6cc)] border-b border-solid content-stretch flex items-center justify-between pb-[25px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="10001:3267">
            <div className="relative shrink-0" data-name="Container" data-node-id="10001:3268">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
                <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="10001:3269">
                  <p className="leading-[normal]">SELECTED WORK</p>
                </div>
              </div>
            </div>
            <div className="relative shrink-0" data-name="Container" data-node-id="10001:3270">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
                <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="10001:3271">
                  <p className="leading-[normal]">05 Case Studies</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--color\/brand\/brown-lightest,#dad6cc)] gap-x-px gap-y-px grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[___304px_367px_fit-content(100%)] relative shrink-0 w-full" data-name="List" data-node-id="10001:3272">
            <div className="bg-[var(--color\/brand\/light-bg,#f3f0ea)] col-1 content-stretch flex flex-col gap-[var(--sizing\/spacing\/spacing\/s-m,20px)] items-start justify-self-stretch px-[var(--sizing\/spacing\/spacing\/m-l,32px)] py-[var(--sizing\/spacing\/spacing\/l,48px)] relative row-2 self-stretch shrink-0" data-name="UI Elements" data-node-id="10001:3797">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="I10001:3797;10001:3709">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="I10001:3797;10001:3710">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="I10001:3797;10001:3711">
                    <p className="leading-[normal]">Case / 02</p>
                  </div>
                </div>
                <div className="bg-[rgba(91,143,235,0.1)] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[3px] shrink-0" data-name="Overlay" data-node-id="I10001:3797;10001:3712">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/blue,#5b8feb)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10001:3797;10001:3713">
                    <p className="leading-[normal]">GOV · VISUAL DESIGN</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2" data-node-id="I10001:3797;10001:3714">
                <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:Bold',sans-serif)] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-darkest,#1a1917)] text-[length:var(--size\/header\/h4,32px)] w-full" data-node-id="I10001:3797;10001:3715">
                  <p className="leading-[1.3] whitespace-pre-wrap">Archbold, Ohio</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="I10001:3797;10001:3716">
                <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Light',sans-serif)] font-light justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-light,#79746b)] text-[length:var(--size\/body\/body-sm,14px)] w-full" data-node-id="I10001:3797;10001:3717" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">{`Government website redesign for a small northwest Ohio village — transforming a cluttered, overlapping layout into a clean, confident design built around their navy and gold brand, a grid calendar their residents actually asked for, and navigation that doesn't require a map to use.`}</p>
                </div>
              </div>
              <div className="border-[var(--color\/brand\/brown-lightest,#dad6cc)] border-solid border-t content-stretch flex gap-[var(--sizing\/spacing\/spacing\/xs,12px)] items-center pt-[21px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="I10001:3797;10001:3718">
                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container" data-node-id="I10001:3797;10001:3719">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_8px] items-start relative w-full">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10001:3797;10001:3720">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10001:3797;10001:3721">
                        <p className="leading-[normal]">Visual Design</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10001:3797;10001:3722">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10001:3797;10001:3723">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10001:3797;10001:3724">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10001:3797;10001:3725">
                        <p className="leading-[normal]">Calendar UX</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10001:3797;10001:3726">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10001:3797;10001:3727">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10001:3797;10001:3728">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10001:3797;10001:3729">
                        <p className="leading-[normal]">ADA</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button/Link/False/False/Only" data-node-id="I10001:3797;10001:3730">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
                    <div className="relative shrink-0 size-[24px]" data-name="arrow-right" data-node-id="I10001:3797;10001:3730;2:509">
                      <div className="absolute flex inset-[21.88%_6.25%] items-center justify-center">
                        <div className="-rotate-90 flex-none h-[14px] w-[9px]">
                          <div className="relative size-full" data-name="arrow" data-node-id="I10001:3797;10001:3730;2:509;1287:7357">
                            <img alt="" className="absolute block max-w-none size-full" src={imgArrow1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color\/brand\/light-bg,#f3f0ea)] col-2 content-stretch flex flex-col gap-[var(--sizing\/spacing\/spacing\/s-m,20px)] items-start justify-self-stretch px-[var(--sizing\/spacing\/spacing\/m-l,32px)] py-[var(--sizing\/spacing\/spacing\/l,48px)] relative row-2 self-stretch shrink-0" data-name="UI Elements" data-node-id="10003:1205">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="I10003:1205;10001:3709">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="I10003:1205;10001:3710">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="I10003:1205;10001:3711">
                    <p className="leading-[normal]">Case / 03</p>
                  </div>
                </div>
                <div className="bg-[rgba(91,143,235,0.1)] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[3px] shrink-0" data-name="Overlay" data-node-id="I10003:1205;10001:3712">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/blue,#5b8feb)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1205;10001:3713">
                    <p className="leading-[normal]">UTILITY · VISUAL DESIGN</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2" data-node-id="I10003:1205;10001:3714">
                <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:Bold',sans-serif)] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-darkest,#1a1917)] text-[length:var(--size\/header\/h4,32px)] w-full" data-node-id="I10003:1205;10001:3715">
                  <p className="leading-[1.3] whitespace-pre-wrap">South Fork Water, Oregon</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="I10003:1205;10001:3716">
                <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Light',sans-serif)] font-light justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-light,#79746b)] text-[length:var(--size\/body\/body-sm,14px)] w-full" data-node-id="I10003:1205;10001:3717" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">{`Website redesign for a wholesale water authority serving Oregon City and West Linn — designed around their "simplicity is brilliant" philosophy and the natural heritage of the Clackamas River headwaters. Pure water since 1915.`}</p>
                </div>
              </div>
              <div className="border-[var(--color\/brand\/brown-lightest,#dad6cc)] border-solid border-t content-stretch flex gap-[var(--sizing\/spacing\/spacing\/xs,12px)] items-center pt-[21px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="I10003:1205;10001:3718">
                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container" data-node-id="I10003:1205;10001:3719">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_8px] items-start relative w-full">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1205;10001:3720">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1205;10001:3721">
                        <p className="leading-[normal]">Brand Guidelines</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1205;10001:3722">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10003:1205;10001:3723">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1205;10001:3724">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1205;10001:3725">
                        <p className="leading-[normal]">Visual Design</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1205;10001:3726">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10003:1205;10001:3727">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1205;10001:3728">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1205;10001:3729">
                        <p className="leading-[normal]">ADA</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button/Link/False/False/Only" data-node-id="I10003:1205;10001:3730">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
                    <div className="relative shrink-0 size-[24px]" data-name="arrow-right" data-node-id="I10003:1205;10001:3730;2:509">
                      <div className="absolute flex inset-[21.88%_6.25%] items-center justify-center">
                        <div className="-rotate-90 flex-none h-[14px] w-[9px]">
                          <div className="relative size-full" data-name="arrow" data-node-id="I10003:1205;10001:3730;2:509;1287:7357">
                            <img alt="" className="absolute block max-w-none size-full" src={imgArrow1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color\/brand\/light-bg,#f3f0ea)] col-1 content-stretch flex flex-col gap-[var(--sizing\/spacing\/spacing\/s-m,20px)] h-[367px] items-start justify-self-stretch px-[var(--sizing\/spacing\/spacing\/m-l,32px)] py-[var(--sizing\/spacing\/spacing\/l,48px)] relative row-3 shrink-0" data-name="UI Elements" data-node-id="10003:1234">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="I10003:1234;10001:3709">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="I10003:1234;10001:3710">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="I10003:1234;10001:3711">
                    <p className="leading-[normal]">Case / 04</p>
                  </div>
                </div>
                <div className="bg-[rgba(91,143,235,0.1)] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[3px] shrink-0" data-name="Overlay" data-node-id="I10003:1234;10001:3712">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/blue,#5b8feb)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1234;10001:3713">
                    <p className="leading-[normal]">GOV · MULTI-SITE</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2" data-node-id="I10003:1234;10001:3714">
                <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:Bold',sans-serif)] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-darkest,#1a1917)] text-[length:var(--size\/header\/h4,32px)] w-full" data-node-id="I10003:1234;10001:3715">
                  <p className="leading-[1.3] whitespace-pre-wrap">City of Clive, Iowa</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="I10003:1234;10001:3716">
                <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Light',sans-serif)] font-light justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-light,#79746b)] text-[length:var(--size\/body\/body-sm,14px)] w-full" data-node-id="I10003:1234;10001:3717" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">{`Multi-site redesign for a city whose identity is literally nature — three distinct but cohesive sites for City Hall, the Public Library, and Parks & Recreation, all built around the Greenbelt trail system that defines Clive.`}</p>
                </div>
              </div>
              <div className="border-[var(--color\/brand\/brown-lightest,#dad6cc)] border-solid border-t content-stretch flex gap-[var(--sizing\/spacing\/spacing\/xs,12px)] items-center pt-[21px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="I10003:1234;10001:3718">
                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container" data-node-id="I10003:1234;10001:3719">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_8px] items-start relative w-full">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1234;10001:3720">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1234;10001:3721">
                        <p className="leading-[normal]">Multi-Site</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1234;10001:3722">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10003:1234;10001:3723">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1234;10001:3724">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1234;10001:3725">
                        <p className="leading-[normal]">Visual Design</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1234;10001:3726">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10003:1234;10001:3727">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1234;10001:3728">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1234;10001:3729">
                        <p className="leading-[normal]">ADA</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button/Link/False/False/Only" data-node-id="I10003:1234;10001:3730">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
                    <div className="relative shrink-0 size-[24px]" data-name="arrow-right" data-node-id="I10003:1234;10001:3730;2:509">
                      <div className="absolute flex inset-[21.88%_6.25%] items-center justify-center">
                        <div className="-rotate-90 flex-none h-[14px] w-[9px]">
                          <div className="relative size-full" data-name="arrow" data-node-id="I10003:1234;10001:3730;2:509;1287:7357">
                            <img alt="" className="absolute block max-w-none size-full" src={imgArrow1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color\/brand\/light-bg,#f3f0ea)] col-2 content-stretch flex flex-col gap-[var(--sizing\/spacing\/spacing\/s-m,20px)] h-[367px] items-start justify-self-stretch px-[var(--sizing\/spacing\/spacing\/m-l,32px)] py-[var(--sizing\/spacing\/spacing\/l,48px)] relative row-3 shrink-0" data-name="UI Elements" data-node-id="10003:1263">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="I10003:1263;10001:3709">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="I10003:1263;10001:3710">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="I10003:1263;10001:3711">
                    <p className="leading-[normal]">Case / 05</p>
                  </div>
                </div>
                <div className="bg-[rgba(91,143,235,0.1)] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[3px] shrink-0" data-name="Overlay" data-node-id="I10003:1263;10001:3712">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/blue,#5b8feb)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1263;10001:3713">
                    <p className="leading-[normal]">GOV · VISUAL DESIGN</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2" data-node-id="I10003:1263;10001:3714">
                <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:Bold',sans-serif)] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-darkest,#1a1917)] text-[length:var(--size\/header\/h4,32px)] w-full" data-node-id="I10003:1263;10001:3715">
                  <p className="leading-[1.3] whitespace-pre-wrap">Temple, Texas</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="I10003:1263;10001:3716">
                <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Light',sans-serif)] font-light justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-light,#79746b)] text-[length:var(--size\/body\/body-sm,14px)] w-full" data-node-id="I10003:1263;10001:3717" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">{`Large city website redesign across three sub-sites — five revision cycles, mobile-first design exports, and coordinated design for City Hall, the Public Library, and Parks & Recreation. A masterclass in client iteration.`}</p>
                </div>
              </div>
              <div className="border-[var(--color\/brand\/brown-lightest,#dad6cc)] border-solid border-t content-stretch flex gap-[var(--sizing\/spacing\/spacing\/xs,12px)] items-center pt-[21px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="I10003:1263;10001:3718">
                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container" data-node-id="I10003:1263;10001:3719">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_8px] items-start relative w-full">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1263;10001:3720">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1263;10001:3721">
                        <p className="leading-[normal]">Multi-Site</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1263;10001:3722">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10003:1263;10001:3723">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1263;10001:3724">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1263;10001:3725">
                        <p className="leading-[normal]">Mobile</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1263;10001:3726">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10003:1263;10001:3727">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1263;10001:3728">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1263;10001:3729">
                        <p className="leading-[normal]">Iteration</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button/Link/False/False/Only" data-node-id="I10003:1263;10001:3730">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
                    <div className="relative shrink-0 size-[24px]" data-name="arrow-right" data-node-id="I10003:1263;10001:3730;2:509">
                      <div className="absolute flex inset-[21.88%_6.25%] items-center justify-center">
                        <div className="-rotate-90 flex-none h-[14px] w-[9px]">
                          <div className="relative size-full" data-name="arrow" data-node-id="I10003:1263;10001:3730;2:509;1287:7357">
                            <img alt="" className="absolute block max-w-none size-full" src={imgArrow1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color\/brand\/light-bg,#f3f0ea)] col-[1/span_2] content-stretch flex flex-col gap-[var(--sizing\/spacing\/spacing\/s-m,20px)] items-start justify-self-stretch px-[var(--sizing\/spacing\/spacing\/m-l,32px)] py-[var(--sizing\/spacing\/spacing\/l,48px)] relative row-1 self-stretch shrink-0" data-name="UI Elements" data-node-id="10003:1292">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="I10003:1292;10001:3709">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="I10003:1292;10001:3710">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="I10003:1292;10001:3711">
                    <p className="leading-[normal]">Case / 01</p>
                  </div>
                </div>
                <div className="bg-[rgba(91,143,235,0.1)] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[3px] shrink-0" data-name="Overlay" data-node-id="I10003:1292;10001:3712">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/blue,#5b8feb)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1292;10001:3713">
                    <p className="leading-[normal]">GOV · REGIONAL PLANNING</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2" data-node-id="I10003:1292;10001:3714">
                <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:Bold',sans-serif)] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-darkest,#1a1917)] text-[length:var(--size\/header\/h4,32px)] w-full" data-node-id="I10003:1292;10001:3715">
                  <p className="leading-[1.3] whitespace-pre-wrap">R6 Regional Council, Utah</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="I10003:1292;10001:3716">
                <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Light',sans-serif)] font-light justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-light,#79746b)] text-[length:var(--size\/body\/body-sm,14px)] w-full" data-node-id="I10003:1292;10001:3717" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">Complete website redesign for a Central Utah regional government body — building a brand color palette from scratch, crafting a clean Apple-inspired layout, and designing a mega menu that makes complex program offerings navigable.</p>
                </div>
              </div>
              <div className="border-[var(--color\/brand\/brown-lightest,#dad6cc)] border-solid border-t content-stretch flex gap-[var(--sizing\/spacing\/spacing\/xs,12px)] items-center pt-[21px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="I10003:1292;10001:3718">
                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container" data-node-id="I10003:1292;10001:3719">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_8px] items-start relative w-full">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1292;10001:3720">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1292;10001:3721">
                        <p className="leading-[normal]">Visual Design</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1292;10001:3722">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10003:1292;10001:3723">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1292;10001:3724">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1292;10001:3725">
                        <p className="leading-[normal]">Brand Color</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1292;10001:3726">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10003:1292;10001:3727">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10003:1292;10001:3728">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10003:1292;10001:3729">
                        <p className="leading-[normal]">ADA</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button/Link/False/False/Only" data-node-id="I10003:1292;10001:3730">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
                    <div className="relative shrink-0 size-[24px]" data-name="arrow-right" data-node-id="I10003:1292;10001:3730;2:509">
                      <div className="absolute flex inset-[21.88%_6.25%] items-center justify-center">
                        <div className="-rotate-90 flex-none h-[14px] w-[9px]">
                          <div className="relative size-full" data-name="arrow" data-node-id="I10003:1292;10001:3730;2:509;1287:7357">
                            <img alt="" className="absolute block max-w-none size-full" src={imgArrow1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--color\/brand\/brown-lightest,#dad6cc)] h-px shrink-0 w-full" data-node-id="10017:1571" />
        <div className="content-stretch flex flex-col gap-[56px] items-start max-w-[1056px] overflow-clip relative shrink-0 w-full" data-name="Container" data-node-id="10017:1423">
          <div className="border-[var(--color\/brand\/brown-lightest,#dad6cc)] border-b border-solid content-stretch flex items-center justify-between pb-[25px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="10017:1424">
            <div className="relative shrink-0" data-name="Container" data-node-id="10017:1425">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
                <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="10017:1426">
                  <p className="leading-[normal]">{`SYSTEMS & PROCESS`}</p>
                </div>
              </div>
            </div>
            <div className="relative shrink-0" data-name="Container" data-node-id="10017:1427">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
                <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="10017:1428">
                  <p className="leading-[normal]">02 Projects</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[var(--color\/brand\/brown-lightest,#dad6cc)] gap-x-px gap-y-px grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_367px] relative shrink-0 w-full" data-name="List" data-node-id="10017:1429">
            <div className="bg-[var(--color\/brand\/light-bg,#f3f0ea)] col-1 content-stretch flex flex-col gap-[var(--sizing\/spacing\/spacing\/s-m,20px)] items-start justify-self-stretch px-[var(--sizing\/spacing\/spacing\/m-l,32px)] py-[var(--sizing\/spacing\/spacing\/l,48px)] relative row-1 self-stretch shrink-0" data-name="UI Elements" data-node-id="10017:1430">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="I10017:1430;10001:3709">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="I10017:1430;10001:3710">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="I10017:1430;10001:3711">
                    <p className="leading-[normal]">System / 01</p>
                  </div>
                </div>
                <div className="bg-[rgba(91,143,235,0.1)] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[3px] shrink-0" data-name="Overlay" data-node-id="I10017:1430;10001:3712">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/blue,#5b8feb)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10017:1430;10001:3713">
                    <p className="leading-[normal]">DESIGN SYSTEMS</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2" data-node-id="I10017:1430;10001:3714">
                <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:Bold',sans-serif)] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-darkest,#1a1917)] text-[length:var(--size\/header\/h4,32px)] w-full" data-node-id="I10017:1430;10001:3715">
                  <p className="leading-[1.3] whitespace-pre-wrap">Revize Design System</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="I10017:1430;10001:3716">
                <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Light',sans-serif)] font-light justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-light,#79746b)] text-[length:var(--size\/body\/body-sm,14px)] w-full" data-node-id="I10017:1430;10001:3717" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">{`The Figma component library behind 170+ government websites — built for consistency, speed, and the team's ability to scale without rebuilding from scratch every time.`}</p>
                </div>
              </div>
              <div className="border-[var(--color\/brand\/brown-lightest,#dad6cc)] border-solid border-t content-stretch flex gap-[var(--sizing\/spacing\/spacing\/xs,12px)] items-center pt-[21px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="I10017:1430;10001:3718">
                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container" data-node-id="I10017:1430;10001:3719">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_8px] items-start relative w-full">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1430;10001:3720">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10017:1430;10001:3721">
                        <p className="leading-[normal]">Variables</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1430;10001:3722">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10017:1430;10001:3723">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1430;10001:3724">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10017:1430;10001:3725">
                        <p className="leading-[normal]">Tokens</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1430;10001:3726">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10017:1430;10001:3727">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1430;10001:3728">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10017:1430;10001:3729">
                        <p className="leading-[normal]">Modes</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button/Link/False/False/Only" data-node-id="I10017:1430;10001:3730">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
                    <div className="relative shrink-0 size-[24px]" data-name="arrow-right" data-node-id="I10017:1430;10001:3730;2:509">
                      <div className="absolute flex inset-[21.88%_6.25%] items-center justify-center">
                        <div className="-rotate-90 flex-none h-[14px] w-[9px]">
                          <div className="relative size-full" data-name="arrow" data-node-id="I10017:1430;10001:3730;2:509;1287:7357">
                            <img alt="" className="absolute block max-w-none size-full" src={imgArrow1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color\/brand\/light-bg,#f3f0ea)] col-2 content-stretch flex flex-col gap-[var(--sizing\/spacing\/spacing\/s-m,20px)] items-start justify-self-stretch px-[var(--sizing\/spacing\/spacing\/m-l,32px)] py-[var(--sizing\/spacing\/spacing\/l,48px)] relative row-1 self-stretch shrink-0" data-name="UI Elements" data-node-id="10017:1431">
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container" data-node-id="I10017:1431;10001:3709">
                <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="I10017:1431;10001:3710">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.55px] whitespace-nowrap" data-node-id="I10017:1431;10001:3711">
                    <p className="leading-[normal]">System / 02</p>
                  </div>
                </div>
                <div className="bg-[rgba(91,143,235,0.1)] content-stretch flex flex-col items-start px-[9px] py-[3px] relative rounded-[3px] shrink-0" data-name="Overlay" data-node-id="I10017:1431;10001:3712">
                  <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/blue,#5b8feb)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10017:1431;10001:3713">
                    <p className="leading-[normal]">AI · WORKFLOW</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 2" data-node-id="I10017:1431;10001:3714">
                <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:Bold',sans-serif)] font-bold justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-darkest,#1a1917)] text-[length:var(--size\/header\/h4,32px)] w-full" data-node-id="I10017:1431;10001:3715">
                  <p className="leading-[1.3] whitespace-pre-wrap">AI-Augmented Design Workflow</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container" data-node-id="I10017:1431;10001:3716">
                <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Light',sans-serif)] font-light justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-light,#79746b)] text-[length:var(--size\/body\/body-sm,14px)] w-full" data-node-id="I10017:1431;10001:3717" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">Building a personal AI-native design system — Claude Code, Figma AI, MCP servers, and Make automations working in concert. Multi-hour tasks reduced to minutes.</p>
                </div>
              </div>
              <div className="border-[var(--color\/brand\/brown-lightest,#dad6cc)] border-solid border-t content-stretch flex gap-[var(--sizing\/spacing\/spacing\/xs,12px)] items-center pt-[21px] relative shrink-0 w-full" data-name="HorizontalBorder" data-node-id="I10017:1431;10001:3718">
                <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container" data-node-id="I10017:1431;10001:3719">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-wrap gap-[0px_8px] items-start relative w-full">
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1431;10001:3720">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10017:1431;10001:3721">
                        <p className="leading-[normal]">Claude Code</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1431;10001:3722">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10017:1431;10001:3723">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1431;10001:3724">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10017:1431;10001:3725">
                        <p className="leading-[normal]">Figma AI</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1431;10001:3726">
                      <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.4px] whitespace-nowrap" data-node-id="I10017:1431;10001:3727">
                        <p className="leading-[normal]">·</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Container" data-node-id="I10017:1431;10001:3728">
                      <div className="flex flex-col font-[family-name:var(--font-family\/subtext,'JetBrains_Mono:Medium',sans-serif)] font-medium justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-light,#79746b)] tracking-[0.5px] whitespace-nowrap" data-node-id="I10017:1431;10001:3729">
                        <p className="leading-[normal]">MCP</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative rounded-[var(--sizing\/radius\/btn-radius,8px)] shrink-0" data-name="Button/Link/False/False/Only" data-node-id="I10017:1431;10001:3730">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative">
                    <div className="relative shrink-0 size-[24px]" data-name="arrow-right" data-node-id="I10017:1431;10001:3730;2:509">
                      <div className="absolute flex inset-[21.88%_6.25%] items-center justify-center">
                        <div className="-rotate-90 flex-none h-[14px] w-[9px]">
                          <div className="relative size-full" data-name="arrow" data-node-id="I10017:1431;10001:3730;2:509;1287:7357">
                            <img alt="" className="absolute block max-w-none size-full" src={imgArrow1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center px-[var(--sizing\/spacing\/page\/page-margin,192px)] py-[112px] relative shrink-0 w-full" data-name="Section - About Matthew" data-node-id="10003:1350">
        <div className="content-stretch flex gap-[var(--sizing\/spacing\/spacing\/xxl,80px)] items-start justify-center max-w-[1056px] relative shrink-0 w-full" data-name="Container" data-node-id="10003:1351">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[var(--sizing\/spacing\/spacing\/m,24px)] items-start max-w-[477.5px] min-h-px min-w-px relative" data-name="Container" data-node-id="10003:1352">
            <div className="content-stretch flex flex-col font-[family-name:var(--font-family\/heading,'Syne:ExtraBold',sans-serif)] font-extrabold items-start leading-[63px] relative shrink-0 text-[60px] w-full whitespace-pre-wrap" data-name="Heading 2" data-node-id="10003:1353">
              <div className="flex flex-col justify-center relative shrink-0 text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full" data-node-id="10003:1354">
                <p className="mb-0">Design</p>
                <p>that lives</p>
              </div>
              <div className="flex flex-col justify-center relative shrink-0 text-[color:var(--color\/brand\/blue,#5b8feb)] w-full" data-node-id="10003:1355">
                <p className="mb-0">inside</p>
                <p>Figma</p>
              </div>
            </div>
            <div className="flex flex-col font-[family-name:var(--font-family\/body,'DM_Sans:Light',sans-serif)] font-light justify-center leading-[0] relative shrink-0 text-[color:var(--color\/brand\/brown-medium,#5a564f)] text-[length:var(--size\/body\/body-reg,16px)] w-full whitespace-pre-wrap" data-node-id="10003:1454" style={{ fontVariationSettings: "'opsz' 14" }}>
              <p className="mb-0">
                <span className="leading-[1.5]">{`I'm a UI/UX designer who spends most of his day in Figma — building systems, not just screens. I design with `}</span>
                <span className="leading-[1.5] text-white">variables, tokens, and modes</span>
                <span className="leading-[1.5]">{` baked in from the start so that the work is maintainable, scalable, and developer-ready.`}</span>
              </p>
              <p className="leading-[1.5] mb-0 text-[16px]">&nbsp;</p>
              <p className="mb-0">
                <span className="leading-[1.5]">{`At Revize Software Systems, I led visual design across `}</span>
                <span className="leading-[1.5] text-white">170+ government website projects</span>
                <span className="leading-[1.5]">{`, built and maintained the company's Figma component library, and overhauled how our team uses AI tools to move faster without losing quality.`}</span>
              </p>
              <p className="leading-[1.5] mb-0 text-[16px]">&nbsp;</p>
              <p className="leading-[1.5]">{`I'm looking for a role where Figma is a first-class tool — on a product team that cares about design systems, accessibility, and shipping real work.`}</p>
            </div>
            <div className="bg-[rgba(196,161,88,0.08)] border border-[rgba(196,161,88,0.22)] border-solid content-stretch flex gap-[8px] items-center px-[15px] py-[10px] relative rounded-[6px] shrink-0 w-full" data-name="Overlay+Border" data-node-id="10003:1372">
              <div className="flex flex-row items-center self-stretch">
                <div className="h-full relative shrink-0 w-[17px]" data-name="Container" data-node-id="10003:1373">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center relative size-full">
                    <div className="h-[10.329px] relative shrink-0 w-[10.45px]" data-name="★" data-node-id="10019:2016">
                      <img alt="" className="absolute block max-w-none size-full" src={img} />
                    </div>
                  </div>
                </div>
              </div>
              <p className="flex-[1_0_0] font-[family-name:var(--font-family\/body,'DM_Sans:Regular',sans-serif)] font-normal leading-[1.5] min-h-px min-w-px relative text-[color:var(--color\/brand\/gold,#c4a158)] text-[length:var(--size\/body\/body-tiny,12px)] whitespace-pre-wrap" data-node-id="10003:1375" style={{ fontVariationSettings: "'opsz' 14" }}>
                2024 Horizon Interactive Gold Award — City of Golden, CO
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col items-start leading-[0] min-h-px min-w-px relative self-stretch" data-name="Container" data-node-id="10003:1376">
            <div className="border-[var(--color\/brand\/brown-dark,#2d2a25)] border-b border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sizing\/spacing\/spacing\/m,24px)] items-start justify-center min-h-px min-w-px py-[var(--sizing\/spacing\/page\/gutter,24px)] relative w-full" data-name="HorizontalBorder" data-node-id="10003:1408">
              <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:ExtraBold',sans-serif)] font-extrabold h-[52px] justify-center relative shrink-0 text-[52px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full" data-node-id="I10003:1408;10003:1402">
                <p className="leading-[0px] whitespace-pre-wrap">3+</p>
              </div>
              <div className="content-stretch flex flex-col gap-[1.69px] items-start relative shrink-0 w-full" data-name="Paragraph" data-node-id="I10003:1408;10003:1403">
                <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[14px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full" data-node-id="I10003:1408;10003:1404" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">Years of experience in Figma</p>
                </div>
                <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[12px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] w-full" data-node-id="I10003:1408;10003:1405" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">Design Systems · Components · Auto Layout · Dev Mode · Variables · Prototyping</p>
                </div>
              </div>
            </div>
            <div className="border-[var(--color\/brand\/brown-dark,#2d2a25)] border-b border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sizing\/spacing\/spacing\/m,24px)] items-start justify-center min-h-px min-w-px py-[var(--sizing\/spacing\/page\/gutter,24px)] relative w-full" data-name="HorizontalBorder" data-node-id="10003:1432">
              <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:ExtraBold',sans-serif)] font-extrabold h-[52px] justify-center relative shrink-0 text-[52px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full" data-node-id="I10003:1432;10003:1402">
                <p className="leading-[0px] whitespace-pre-wrap">170+</p>
              </div>
              <div className="content-stretch flex flex-col gap-[1.69px] items-start relative shrink-0 w-full" data-name="Paragraph" data-node-id="I10003:1432;10003:1403">
                <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[14px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full" data-node-id="I10003:1432;10003:1404" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">Government websites shipped</p>
                </div>
                <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[12px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] w-full" data-node-id="I10003:1432;10003:1405" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">From discovery through developer handoff</p>
                </div>
              </div>
            </div>
            <div className="border-[var(--color\/brand\/brown-dark,#2d2a25)] border-b border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sizing\/spacing\/spacing\/m,24px)] items-start justify-center min-h-px min-w-px py-[var(--sizing\/spacing\/page\/gutter,24px)] relative w-full" data-name="HorizontalBorder" data-node-id="10003:1438">
              <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:ExtraBold',sans-serif)] font-extrabold h-[52px] justify-center relative shrink-0 text-[52px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full" data-node-id="I10003:1438;10003:1402">
                <p className="leading-[0px] whitespace-pre-wrap">Gold</p>
              </div>
              <div className="content-stretch flex flex-col gap-[1.69px] items-start relative shrink-0 w-full" data-name="Paragraph" data-node-id="I10003:1438;10003:1403">
                <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[14px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full" data-node-id="I10003:1438;10003:1404" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">2024 Horizon Interactive Award</p>
                </div>
                <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[12px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] w-full" data-node-id="I10003:1438;10003:1405" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">City of Golden, CO — lead designer, end-to-end</p>
                </div>
              </div>
            </div>
            <div className="border-[var(--color\/brand\/brown-dark,#2d2a25)] border-b border-solid content-stretch flex flex-[1_0_0] flex-col gap-[var(--sizing\/spacing\/spacing\/m,24px)] items-start justify-center min-h-px min-w-px py-[var(--sizing\/spacing\/page\/gutter,24px)] relative w-full" data-name="HorizontalBorder" data-node-id="10003:1444">
              <div className="flex flex-col font-[family-name:var(--font-family\/heading,'Syne:ExtraBold',sans-serif)] font-extrabold h-[52px] justify-center relative shrink-0 text-[52px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full" data-node-id="I10003:1444;10003:1402">
                <p className="leading-[0px] whitespace-pre-wrap">4+</p>
              </div>
              <div className="content-stretch flex flex-col gap-[1.69px] items-start relative shrink-0 w-full" data-name="Paragraph" data-node-id="I10003:1444;10003:1403">
                <div className="flex flex-col font-['DM_Sans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[14px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)] w-full" data-node-id="I10003:1444;10003:1404" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="leading-[1.5] whitespace-pre-wrap">AI tools in daily workflow</p>
                </div>
                <div className="flex flex-col font-['DM_Sans:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[12px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] w-full" data-node-id="I10003:1444;10003:1405" style={{ fontVariationSettings: "'opsz' 14" }}>
                  <p className="whitespace-pre-wrap">
                    <span className="leading-[1.5]">Claude</span>
                    <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.5]" style={{ fontVariationSettings: "'opsz' 14" }}>{` · `}</span>
                    <span className="leading-[1.5]">Figma AI</span>
                    <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.5]" style={{ fontVariationSettings: "'opsz' 14" }}>{` · `}</span>
                    <span className="leading-[1.5]">MCP</span>
                    <span className="font-['DM_Sans:Regular',sans-serif] font-normal leading-[1.5]" style={{ fontVariationSettings: "'opsz' 14" }}>{` · `}</span>
                    <span className="leading-[1.5]">Make</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color\/brand\/brown-darkest,#1a1917)] border-[var(--color\/brand\/brown-dark,#2d2a25)] border-solid border-t content-stretch flex flex-col items-center pb-[80px] pt-[81px] px-[var(--sizing\/spacing\/page\/page-margin,192px)] relative shrink-0 w-full" data-name="Section - Contact" data-node-id="10003:1456">
        <div className="max-w-[1056px] relative shrink-0 w-full" data-name="Container" data-node-id="10003:1457">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-between max-w-[inherit] relative w-full">
            <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 whitespace-nowrap" data-name="Paragraph" data-node-id="10003:1458">
              <div className="flex flex-col font-['Syne:ExtraBold',sans-serif] font-extrabold justify-center leading-[normal] relative shrink-0 text-[44px] text-[color:var(--color\/brand\/light-bg,#f3f0ea)]" data-node-id="10003:1459">
                <p className="mb-0">{`Let's work`}</p>
                <p>together.</p>
              </div>
              <div className="flex flex-col font-['DM_Sans:Light',sans-serif] font-light justify-center leading-[24px] relative shrink-0 text-[15px] text-[color:var(--color\/brand\/brown-medium,#5a564f)]" data-node-id="10003:1460" style={{ fontVariationSettings: "'opsz' 14" }}>
                <p className="mb-0">Open to full-time product designer roles.</p>
                <p>Remote preferred, Tampa area also open.</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[12px] items-end pt-[8px] relative shrink-0" data-name="Container" data-node-id="10003:1461">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Link" data-node-id="10003:1462">
                <div className="content-stretch flex flex-col items-end min-w-[56px] opacity-45 pl-[22px] relative shrink-0" data-name="Container" data-node-id="10003:1463">
                  <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] text-right tracking-[0.8px] uppercase whitespace-nowrap" data-node-id="10003:1464">
                    <p className="leading-[normal]">Email</p>
                  </div>
                </div>
                <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] whitespace-nowrap" data-node-id="10003:1465">
                  <p className="leading-[normal]">matt@digitalfish.io</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Link" data-node-id="10003:1466">
                <div className="content-stretch flex flex-col items-end min-w-[56px] opacity-45 pl-[1.59px] relative shrink-0" data-name="Container" data-node-id="10003:1467">
                  <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] text-right tracking-[0.8px] uppercase whitespace-nowrap" data-node-id="10003:1468">
                    <p className="leading-[normal]">LinkedIn</p>
                  </div>
                </div>
                <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] whitespace-nowrap" data-node-id="10003:1469">
                  <p className="leading-[normal]">linkedin.com/in/matthghi</p>
                </div>
              </div>
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="Link" data-node-id="10003:1470">
                <div className="content-stretch flex flex-col items-end min-w-[56px] opacity-45 pl-[28.79px] pr-[0.01px] relative shrink-0" data-name="Container" data-node-id="10003:1471">
                  <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[10px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] text-right tracking-[0.8px] uppercase whitespace-nowrap" data-node-id="10003:1472">
                    <p className="leading-[normal]">Site</p>
                  </div>
                </div>
                <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[13px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] whitespace-nowrap" data-node-id="10003:1473">
                  <p className="leading-[normal]">digitalfish.io</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[var(--color\/brand\/brown-darkest,#1a1917)] border-[var(--color\/brand\/brown-dark,#2d2a25)] border-solid border-t content-stretch flex flex-col items-center pb-[24px] pt-[25px] px-[var(--sizing\/spacing\/page\/page-margin,192px)] relative shrink-0 w-full" data-name="Footer - FOOTER" data-node-id="10003:1475">
        <div className="max-w-[1056px] relative shrink-0 w-full" data-name="Container" data-node-id="10003:1476">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between max-w-[inherit] relative w-full">
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="10003:1477">
              <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] tracking-[0.44px] whitespace-nowrap" data-node-id="10003:1478">
                <p className="leading-[normal]">© 2026 Matt Hicks</p>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container" data-node-id="10003:1479">
              <div className="flex flex-col font-['JetBrains_Mono:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[11px] text-[color:var(--color\/brand\/brown-medium,#5a564f)] tracking-[0.44px] whitespace-nowrap" data-node-id="10003:1480">
                <p>
                  <span className="leading-[normal]">{`Built with `}</span>
                  <span className="leading-[normal] text-[#5b8feb]">Figma + Claude Code</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
