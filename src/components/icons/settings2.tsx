import React from 'react';

import type { ISVGElement } from './types';

export const Settings2 = (props: ISVGElement) => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} >
    <g clipPath="url(#clip0_383:21931)">
      <path d="M15.4146 17.2844C15.1622 17.1328 14.9033 16.9803 14.6443 16.8309C14.7052 16.312 14.7053 15.7871 14.6446 15.2692C14.9045 15.1192 15.1634 14.9669 15.4145 14.8159C15.8373 14.5618 16.0135 14.0258 15.8244 13.5689C15.8244 13.5689 15.8244 13.5689 15.8243 13.5688L15.2725 12.2367C15.0833 11.78 14.5799 11.5254 14.101 11.6447C13.8164 11.7155 13.5257 11.7908 13.2359 11.8686C12.9124 11.4593 12.5412 11.0881 12.1314 10.7645C12.2091 10.4747 12.2845 10.1838 12.3554 9.89911C12.4747 9.42047 12.2201 8.91684 11.7634 8.72761L10.4313 8.17584C9.97454 7.98656 9.43834 8.16267 9.18419 8.58557C9.03283 8.83748 8.88034 9.09647 8.73072 9.35587C8.21195 9.29498 7.68714 9.29484 7.16903 9.35554C7.01894 9.09534 6.86655 8.83645 6.71575 8.58557C6.4615 8.16276 5.92544 7.98661 5.46864 8.17584L4.13655 8.72761C3.67989 8.91679 3.42526 9.42047 3.54456 9.89911C3.61558 10.1843 3.69086 10.4752 3.76844 10.7642C3.35917 11.0876 2.98801 11.4589 2.66439 11.8687C2.37395 11.7908 2.08305 11.7155 1.79894 11.6447C1.32016 11.5253 0.816624 11.7801 0.62739 12.2368L0.0757183 13.5688C-0.113422 14.0256 0.0627808 14.5617 0.485499 14.8158C0.737453 14.9672 0.996437 15.1196 1.2558 15.2693C1.19495 15.788 1.19481 16.3128 1.25551 16.831C0.995921 16.9808 0.737078 17.1331 0.485406 17.2844C0.062687 17.5385 -0.113516 18.0745 0.0756714 18.5314L0.627484 19.8635C0.816671 20.3202 1.32006 20.5749 1.79903 20.4555C2.08328 20.3847 2.37409 20.3095 2.66401 20.2316C2.9875 20.6409 3.3587 21.012 3.76853 21.3357C3.69072 21.6258 3.61539 21.9167 3.54456 22.201C3.42526 22.6797 3.6798 23.1834 4.13655 23.3725L5.46869 23.9244C5.59244 23.9756 5.72195 24.0001 5.85011 24.0001C6.1952 24.0001 6.53045 23.8229 6.71594 23.5147C6.86617 23.2647 7.01856 23.0058 7.1694 22.7444C7.68808 22.8052 8.21303 22.8053 8.73109 22.7447C8.88011 23.0031 9.0325 23.2619 9.18437 23.5147C9.43853 23.9375 9.97459 24.1136 10.4315 23.9245L11.7636 23.3727C12.2202 23.1835 12.4749 22.6798 12.3556 22.2012C12.2851 21.9184 12.2098 21.6276 12.1317 21.3361C12.5409 21.0127 12.9121 20.6415 13.2358 20.2316C13.5254 20.3093 13.8163 20.3846 14.1011 20.4556C14.5797 20.575 15.0834 20.3204 15.2726 19.8635L15.8244 18.5314C16.0135 18.0746 15.8373 17.5385 15.4146 17.2844ZM14.3023 19.3985C14.0287 19.33 13.7498 19.2575 13.4725 19.1828C13.0799 19.0772 12.6655 19.2152 12.4169 19.5347C12.1312 19.9017 11.8005 20.2325 11.434 20.5178C11.115 20.7663 10.9771 21.1805 11.0828 21.5729C11.158 21.852 11.2304 22.1307 11.2985 22.4024L10.074 22.9096C9.92837 22.6666 9.78255 22.4183 9.64 22.1706C9.43717 21.8184 9.04679 21.6232 8.6455 21.6729C8.18467 21.7301 7.7169 21.73 7.25547 21.6726C6.85305 21.6227 6.463 21.8178 6.26022 22.1702C6.11594 22.4207 5.97006 22.6691 5.82601 22.9095L4.60155 22.4023C4.67003 22.1292 4.7425 21.8503 4.81731 21.5726C4.92301 21.18 4.78487 20.7656 4.46542 20.517C4.09839 20.2313 3.76769 19.9006 3.48231 19.5342C3.23387 19.2151 2.81969 19.0772 2.42716 19.1829C2.14951 19.2577 1.87075 19.3301 1.5977 19.3986L1.09052 18.1742C1.33239 18.0291 1.58078 17.8833 1.8295 17.7401C2.18176 17.5373 2.37714 17.147 2.32726 16.7456C2.26994 16.2848 2.27008 15.817 2.32741 15.3556C2.37747 14.9538 2.18223 14.5631 1.82978 14.3603C1.58116 14.2171 1.33272 14.0712 1.09047 13.926L1.59766 12.7015C1.87047 12.7699 2.14928 12.8424 2.42744 12.9173C2.81987 13.023 3.23425 12.8848 3.48306 12.5654C3.76876 12.1983 4.09947 11.8676 4.4658 11.5823C4.78492 11.3338 4.92278 10.9196 4.81708 10.527C4.74255 10.2503 4.67008 9.97158 4.60141 9.69764L5.82587 9.1905C5.97044 9.43172 6.11631 9.68006 6.25989 9.92948C6.46276 10.2817 6.85347 10.4774 7.25439 10.4272C7.71503 10.3699 8.1827 10.3699 8.64456 10.4274C9.04651 10.4775 9.43698 10.282 9.63976 9.92976C9.78287 9.68114 9.92879 9.4327 10.0739 9.1905L11.2984 9.69764C11.2299 9.97106 11.1574 10.2499 11.0826 10.5275C10.9769 10.92 11.1151 11.3344 11.4345 11.583C11.8015 11.8688 12.1322 12.1994 12.4176 12.5658C12.6661 12.8849 13.0801 13.0227 13.4728 12.9171C13.7503 12.8423 14.029 12.7699 14.3022 12.7014L14.8094 13.9258C14.5678 14.0706 14.3195 14.2164 14.0704 14.3599C13.7181 14.5627 13.5227 14.953 13.5726 15.3544C13.63 15.815 13.6299 16.2828 13.5724 16.7446C13.5224 17.1463 13.7177 17.5369 14.0701 17.7398C14.3183 17.8827 14.5667 18.0286 14.8094 18.174L14.3023 19.3985Z" fill="#95A5B1" />
      <path d="M11.3325 14.6489C11.3325 14.6489 11.3325 14.6489 11.3325 14.6488C10.56 12.7837 8.41423 11.8948 6.54884 12.6674C4.68378 13.44 3.79484 15.5859 4.56743 17.451C4.94164 18.3546 5.64542 19.0582 6.54889 19.4325C7.00062 19.6196 7.47528 19.7132 7.94993 19.7132C8.42459 19.7132 8.89924 19.6196 9.35107 19.4325C11.2161 18.6599 12.105 16.5141 11.3325 14.6489ZM8.93993 18.44C8.30159 18.7044 7.59851 18.7044 6.95998 18.44C6.32164 18.1756 5.82443 17.6783 5.55996 17.0399C5.01401 15.7221 5.64213 14.2058 6.96003 13.6599C7.28276 13.5262 7.61726 13.463 7.9466 13.463C8.96224 13.463 9.92778 14.0648 10.34 15.06C10.8859 16.3778 10.2578 17.8941 8.93993 18.44Z" fill="#95A5B1" />
      <path d="M23.2759 4.73137C23.0905 4.70362 22.9 4.67667 22.7082 4.65108C22.6115 4.32966 22.4824 4.01803 22.3232 3.72206C22.4405 3.56855 22.5562 3.41475 22.668 3.26367C22.9162 2.928 22.8803 2.45194 22.5846 2.15634L21.8436 1.41544C21.5478 1.11966 21.0718 1.0838 20.7362 1.33209C20.5846 1.44427 20.4309 1.55991 20.2778 1.67686C19.9819 1.51758 19.6703 1.38848 19.3488 1.29178C19.3232 1.09997 19.2963 0.909516 19.2685 0.724125C19.2068 0.311344 18.8448 0 18.4266 0H17.3787C16.9605 0 16.5985 0.311344 16.5368 0.724078C16.5091 0.909375 16.4822 1.09987 16.4565 1.29173C16.135 1.38844 15.8234 1.51753 15.5275 1.67681C15.3745 1.55981 15.2207 1.44412 15.0692 1.33205C14.7335 1.08375 14.2574 1.11961 13.9618 1.41534L13.2209 2.1562C12.9251 2.45189 12.8891 2.928 13.1374 3.26372C13.2491 3.41475 13.3648 3.56859 13.4822 3.72206C13.323 4.01798 13.1938 4.32956 13.0971 4.65108C12.9054 4.67672 12.7149 4.70362 12.5295 4.73137C12.1166 4.79316 11.8053 5.15508 11.8053 5.57334V6.62123C11.8053 7.03945 12.1165 7.40142 12.5294 7.4632C12.7148 7.49095 12.9053 7.51791 13.0971 7.5435C13.1938 7.86497 13.3229 8.17655 13.4821 8.47252C13.3649 8.62589 13.2492 8.77964 13.1373 8.93091C12.8891 9.26648 12.925 9.74264 13.2207 10.0382L13.9617 10.7792C14.2574 11.075 14.7334 11.1108 15.0691 10.8625C15.2207 10.7505 15.3744 10.6347 15.5274 10.5178C15.8234 10.6771 16.135 10.8062 16.4565 10.9028C16.482 11.0946 16.509 11.2851 16.5367 11.4705C16.5985 11.8833 16.9605 12.1947 17.3787 12.1947H18.4266C18.8448 12.1947 19.2068 11.8834 19.2685 11.4705C19.2963 11.2851 19.3232 11.0946 19.3488 10.9028C19.6703 10.8062 19.9818 10.677 20.2778 10.5177C20.4308 10.6347 20.5846 10.7504 20.7362 10.8625C21.0717 11.1108 21.5479 11.075 21.8435 10.7792L22.5845 10.0383C22.8803 9.74264 22.9162 9.26653 22.6679 8.93086C22.556 8.77964 22.4403 8.6258 22.3232 8.47256C22.4823 8.17664 22.6115 7.86511 22.7082 7.54355C22.9 7.51791 23.0905 7.491 23.2758 7.46325C23.6887 7.40147 24 7.03955 24 6.62128V5.57339C24 5.15513 23.6887 4.79316 23.2759 4.73137ZM22.9794 6.47541C22.811 6.49983 22.6392 6.52355 22.4669 6.546C22.126 6.59048 21.8469 6.83245 21.756 7.16236C21.669 7.47825 21.5426 7.78308 21.3806 8.06836C21.2113 8.36616 21.2374 8.73469 21.4471 9.00736C21.5528 9.1448 21.6577 9.28312 21.7597 9.41981L21.2252 9.95442C21.088 9.85209 20.9497 9.74728 20.8126 9.64181C20.54 9.43205 20.1714 9.40613 19.8736 9.5752C19.5882 9.7373 19.2834 9.86363 18.9677 9.95067C18.6376 10.0416 18.3956 10.3207 18.3513 10.6615C18.3288 10.8339 18.3052 11.0057 18.2807 11.1741H17.5246C17.5002 11.0057 17.4765 10.8339 17.454 10.6617C17.4095 10.3208 17.1676 10.0417 16.8376 9.95072C16.5218 9.86372 16.2171 9.73739 15.9317 9.5753C15.6338 9.40608 15.2652 9.43209 14.9927 9.64181C14.8555 9.74733 14.7173 9.85209 14.5801 9.95442L14.0455 9.41981C14.1475 9.28298 14.2524 9.14475 14.3582 9.00717C14.5677 8.73459 14.5938 8.36606 14.4246 8.06827C14.2626 7.78298 14.1363 7.47811 14.0492 7.16231C13.9583 6.83231 13.6793 6.59039 13.3383 6.54591C13.166 6.52341 12.9941 6.49978 12.8258 6.47527V5.71927C12.9941 5.69484 13.1659 5.67112 13.3383 5.64867C13.6792 5.60419 13.9583 5.36222 14.0492 5.03231C14.1362 4.71647 14.2625 4.41164 14.4246 4.12631C14.5938 3.82852 14.5677 3.45994 14.3582 3.18736C14.2523 3.04973 14.1475 2.91145 14.0455 2.77486L14.5801 2.24025C14.7172 2.34258 14.8555 2.44739 14.9926 2.55281C15.265 2.76258 15.6336 2.78873 15.9317 2.61947C16.2169 2.45742 16.5218 2.33109 16.8375 2.244C17.1676 2.15306 17.4096 1.87397 17.4539 1.53314C17.4764 1.36078 17.5001 1.18898 17.5246 1.02061H18.2807C18.3051 1.18894 18.3288 1.36073 18.3512 1.533C18.3957 1.87397 18.6377 2.15306 18.9676 2.24395C19.2835 2.331 19.5883 2.45738 19.8736 2.61942C20.1715 2.78869 20.5401 2.76239 20.8125 2.55286C20.9497 2.44739 21.088 2.34258 21.2252 2.24025L21.7597 2.77486C21.6578 2.9115 21.553 3.04983 21.4471 3.1875C21.2375 3.46003 21.2114 3.82856 21.3805 4.12636C21.5426 4.41173 21.6689 4.71661 21.756 5.03236C21.8469 5.36236 22.1259 5.60428 22.4668 5.64877C22.6392 5.67127 22.811 5.69494 22.9794 5.71941V6.47541Z" fill="#95A5B1" />
      <path d="M17.9027 3.92236C16.7034 3.92236 15.7277 4.89807 15.7277 6.09741C15.7277 7.2968 16.7034 8.2725 17.9027 8.2725C19.1021 8.2725 20.0778 7.2968 20.0778 6.09741C20.0778 4.89807 19.1021 3.92236 17.9027 3.92236ZM17.9027 7.30561C17.2366 7.30561 16.6945 6.7636 16.6945 6.09736C16.6945 5.43113 17.2365 4.88916 17.9027 4.88916C18.5689 4.88916 19.1109 5.43118 19.1109 6.09736C19.1109 6.7636 18.5689 7.30561 17.9027 7.30561Z" fill="#95A5B1" />
    </g>
    <defs>
      <clipPath id="clip0_383:21931">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);