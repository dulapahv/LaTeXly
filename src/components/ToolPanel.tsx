/**
 * List of all the symbols for users to choose from.
 *
 * References:
 * https://www.math.uci.edu/~xiangwen/pdf/LaTeX-Math-Symbols.pdf
 * https://stackoverflow.com/a/77560380/17302377
 * https://stackoverflow.com/a/74445912/17302377
 * https://stackoverflow.com/a/73693601/17302377
 */

import { TbArrowDownRight } from 'react-icons/tb';

import { ScrollShadow } from '@nextui-org/react';

import { SymBtn } from '.';

const ToolPanel = () => {
  return (
    <ScrollShadow className="flex h-full flex-row flex-wrap content-start overflow-y-scroll p-2 *:relative *:size-fit hover:[&>*:not(&_.group\/no-drawer)]:rounded-t-lg hover:[&>*:not(&_.group\/no-drawer)]:shadow-small [&>*:not(:last-child)]:border-r [&>div>div]:absolute [&>div>div]:z-10 [&>div>div]:hidden [&>div>div]:rounded-b-lg [&>div>div]:border-b-1 [&>div>div]:bg-white [&>div>div]:shadow-lg [&>div>p]:relative [&>div>p]:flex [&>div>p]:w-full [&>div>p]:justify-center [&>div>p]:[font-size:11px]">
      <div className="group">
        <SymBtn text="x^n" value="^{}" caretPosition={2} />
        <SymBtn text="x_n" value="_{}" caretPosition={2} />
        <SymBtn text="\sqrt{x}" value="\sqrt{}" caretPosition={6} />
        <SymBtn text="\frac{x}{y}" value="\frac{}{}" caretPosition={6} />
        <SymBtn text="\sum" value="\sum_{}^{}" caretPosition={6} />
        <SymBtn text="\prod" value="\prod_{}^{}" caretPosition={7} />
        <SymBtn text="\int" value="\int_{}^{}" caretPosition={6} />
        <div className="grid-cols-7 group-hover:grid">
          <SymBtn text="\sqrt[n]{x}" value="\sqrt[]{}" caretPosition={6} />
          <SymBtn text="\oint" value="\oint_{}^{}" caretPosition={7} />
          <SymBtn text="\frac{d}{dx}" value="\frac{d }{dx}" caretPosition={8} />
          <SymBtn
            text="\frac{\partial}{\partial x}"
            value="\frac{\partial }{\partial x}"
            caretPosition={15}
          />
          <SymBtn text="\implies" value="\implies " />
          <SymBtn text="\iff" value="\iff " />
          <SymBtn text="\times" value="\times " />
          <SymBtn text="\#" value="\# " />
          <SymBtn text="\wedge" value="\wedge " />
          <SymBtn text="\vee" value="\vee " />
          <SymBtn text="\in" value="\in " />
          <SymBtn text="\notin" value="\notin " />
          <SymBtn text="\smallsetminus" value="\smallsetminus " />
          <SymBtn text="\lim_{x \to 0}" value="\lim_{x \to 0} " isBlockMath />
          <SymBtn text="\infty" value="\infty " />
          <SymBtn text="\pm" value="\pm " />
          <SymBtn text="\mp" value="\mp " />
          <SymBtn text="\emptyset" value="\emptyset " />
          <SymBtn text="\forall" value="\forall " />
          <SymBtn text="\exists" value="\exists " />
          <SymBtn text="\neq" value="\neq " />
          <SymBtn text="\Delta" value="\Delta " />
          <SymBtn text="\to" value="\to " />
          <SymBtn text="|" value="| " />
          <SymBtn text="\nmid" value="\nmid " />
          <SymBtn text="\{\}" value="\{   \}" caretPosition={4} />
          <SymBtn text="\neg" value="\neg " />
          <SymBtn text="\approx" value="\approx " />
        </div>
        <p>
          Common Symbols
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn text="\hat{a}" value="\hat{}" caretPosition={5} />
        <SymBtn text="\check{a}" value="\check{}" caretPosition={7} />
        <SymBtn text="\tilde{a}" value="\tilde{}" caretPosition={6} />
        <SymBtn text="\acute{a}" value="\acute{}" caretPosition={7} />
        <div className="grid-cols-4 group-hover:grid">
          <SymBtn text="\grave{a}" value="\grave{}" caretPosition={7} />
          <SymBtn text="\dot{a}" value="\dot{}" caretPosition={5} />
          <SymBtn text="\ddot{a}" value="\ddot{}" caretPosition={6} />
          <SymBtn text="\breve{a}" value="\breve{}" caretPosition={7} />
          <SymBtn text="\bar{a}" value="\bar{}" caretPosition={5} />
          <SymBtn text="\vec{a}" value="\vec{}" caretPosition={5} />
          <SymBtn text="\widehat{a}" value="\widehat{}" caretPosition={9} />
          <SymBtn
            text="\widetilde{a}"
            value="\widetilde{}"
            caretPosition={11}
          />
        </div>
        <p>
          Math Mode Accents
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn text="\alpha" value="\alpha " />
        <SymBtn text="\theta" value="\theta " />
        <SymBtn text="o" value="o " />
        <SymBtn text="\upsilon" value="\upsilon " />
        <SymBtn text="\beta" value="\beta " />
        <div className="absolute z-10 hidden grid-cols-5 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn text="\vartheta" value="\vartheta " />
          <SymBtn text="\pi" value="\pi " />
          <SymBtn text="\phi" value="\phi " />
          <SymBtn text="\gamma" value="\gamma " />
          <SymBtn text="\iota" value="\iota " />
          <SymBtn text="\varpi" value="\varpi " />
          <SymBtn text="\varphi" value="\varphi " />
          <SymBtn text="\delta" value="\delta " />
          <SymBtn text="\kappa" value="\kappa " />
          <SymBtn text="\rho" value="\rho " />
          <SymBtn text="\chi" value="\chi " />
          <SymBtn text="\epsilon" value="\epsilon " />
          <SymBtn text="\lambda" value="\lambda " />
          <SymBtn text="\varrho" value="\varrho " />
          <SymBtn text="\psi" value="\psi " />
          <SymBtn text="\varepsilon" value="\varepsilon " />
          <SymBtn text="\mu" value="\mu " />
          <SymBtn text="\sigma" value="\sigma " />
          <SymBtn text="\omega" value="\omega " />
          <SymBtn text="\zeta" value="\zeta " />
          <SymBtn text="\nu" value="\nu " />
          <SymBtn text="\varsigma" value="\varsigma " />
          <SymBtn text="\eta" value="\eta " />
          <SymBtn text="\xi" value="\xi " />
          <SymBtn text="\tau" value="\tau " />
        </div>
        <p>
          Lowercase Greek Letters
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn text="\Gamma" value="\Gamma " />
        <SymBtn text="\Lambda" value="\Lambda " />
        <SymBtn text="\Sigma" value="\Sigma " />
        <SymBtn text="\Psi" value="\Psi " />
        <SymBtn text="\Delta" value="\Delta " />
        <div className="absolute z-10 hidden grid-cols-5 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn text="\Xi" value="\Xi " />
          <SymBtn text="\Upsilon" value="\Upsilon " />
          <SymBtn text="\Omega" value="\Omega " />
          <SymBtn text="\Theta" value="\Theta " />
          <SymBtn text="\Pi" value="\Pi " />
          <SymBtn text="\Phi" value="\Phi " />
        </div>
        <p>
          Uppercase Greek Letters
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn text="\lt" value="\lt " />
        <SymBtn text="\gt" value="\gt " />
        <SymBtn text="=" value="=" />
        <SymBtn text="\le" value="\le " />
        <SymBtn text="\ge" value="\ge " />
        <SymBtn text="\equiv" value="\equiv " />
        <div className="absolute z-10 hidden grid-cols-6 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn text="\ll" value="\ll " />
          <SymBtn text="\gg" value="\gg " />
          <SymBtn text="\doteq" value="\doteq " />
          <SymBtn text="\prec" value="\prec " />
          <SymBtn text="\succ" value="\succ " />
          <SymBtn text="\sim" value="\sim " />
          <SymBtn text="\preceq" value="\preceq " />
          <SymBtn text="\succeq" value="\succeq " />
          <SymBtn text="\simeq" value="\simeq " />
          <SymBtn text="\subset" value="\subset " />
          <SymBtn text="\supset" value="\supset " />
          <SymBtn text="\approx" value="\approx " />
          <SymBtn text="\subseteq" value="\subseteq " />
          <SymBtn text="\supseteq" value="\supseteq " />
          <SymBtn text="\cong" value="\cong " />
          <SymBtn text="\sqsubset" value="\sqsubset " />
          <SymBtn text="\sqsupset" value="\sqsupset " />
          <SymBtn text="\Join" value="\Join " />
          <SymBtn text="\sqsubseteq" value="\sqsubseteq " />
          <SymBtn text="\sqsupseteq" value="\sqsupseteq " />
          <SymBtn text="\bowtie" value="\bowtie " />
          <SymBtn text="\in" value="\in " />
          <SymBtn text="\ni" value="\ni " />
          <SymBtn text="\propto" value="\propto " />
          <SymBtn text="\vdash" value="\vdash " />
          <SymBtn text="\dashv" value="\dashv " />
          <SymBtn text="\models" value="\models " />
          <SymBtn text="\mid" value="\mid " />
          <SymBtn text="\parallel" value="\parallel " />
          <SymBtn text="\perp" value="\perp " />
          <SymBtn text="\smile" value="\smile " />
          <SymBtn text="\frown" value="\frown " />
          <SymBtn text="\asymp" value="\asymp " />
          <SymBtn text=":" value=": " />
          <span></span>
          <span></span>
          <SymBtn text="\nless" value="\nless " />
          <SymBtn text="\ngtr" value="\ngtr " />
          <SymBtn text="\neq" value="\neq " />
          <SymBtn text="\nleq" value="\nleq " />
          <SymBtn text="\ngeq" value="\ngeq " />
          <SymBtn text="\not\equiv" value="\not\equiv " />
          <SymBtn text="\not\ll" value="\not\ll " />
          <SymBtn text="\not\gg" value="\not\gg " />
          <SymBtn text="\not\doteq" value="\not\doteq " />
          <SymBtn text="\nprec" value="\nprec " />
          <SymBtn text="\nsucc" value="\nsucc " />
          <SymBtn text="\nsim" value="\nsim " />
          <SymBtn text="\npreceq" value="\npreceq " />
          <SymBtn text="\nsucceq" value="\nsucceq " />
          <SymBtn text="\not\simeq" value="\not\simeq " />
          <SymBtn text="\not\subset" value="\not\subset " />
          <SymBtn text="\not\supset" value="\not\supset " />
          <SymBtn text="\not\approx" value="\not\approx " />
          <SymBtn text="\not\subseteq" value="\not\subseteq " />
          <SymBtn text="\not\supseteq" value="\not\supseteq " />
          <SymBtn text="\not\cong" value="\not\cong " />
          <SymBtn text="\not\sqsubset" value="\not\sqsubset " />
          <SymBtn text="\not\sqsupset" value="\not\sqsupset " />
          <SymBtn text="\not\Join" value="\not\Join " />
          <SymBtn text="\not\sqsubseteq" value="\not\sqsubseteq " />
          <SymBtn text="\not\sqsupseteq" value="\not\sqsupseteq " />
          <SymBtn text="\not\bowtie" value="\not\bowtie " />
          <SymBtn text="\not\in" value="\not\in " />
          <SymBtn text="\not\ni" value="\not\ni " />
          <SymBtn text="\not\propto" value="\not\propto " />
          <SymBtn text="\not\vdash" value="\not\vdash " />
          <SymBtn text="\not\dashv" value="\not\dashv " />
          <SymBtn text="\not\models" value="\not\models " />
          <SymBtn text="\not\mid" value="\not\mid " />
          <SymBtn text="\not\parallel" value="\not\parallel " />
          <SymBtn text="\not\perp" value="\not\perp " />
          <SymBtn text="\not\smile" value="\not\smile " />
          <SymBtn text="\not\frown" value="\not\frown " />
          <SymBtn text="\not\asymp" value="\not\asymp " />
          <SymBtn text="\not:" value="\not: " />
        </div>
        <p>
          Binary Relations
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn text="+" value="+" />
        <SymBtn text="-" value="-" />
        <SymBtn text="\times" value="\times " />
        <SymBtn text="\div" value="\div " />
        <SymBtn text="\cdot" value="\cdot " />
        <SymBtn text="\pm" value="\pm " />
        <div className="absolute z-10 hidden grid-cols-6 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn text="\mp" value="\mp " />
          <SymBtn text="\ast" value="\ast " />
          <SymBtn text="\triangleleft" value="\triangleleft " />
          <SymBtn text="\triangleright" value="\triangleright " />
          <SymBtn text="\setminus" value="\setminus " />
          <SymBtn text="\star" value="\star " />
          <SymBtn text="\cup" value="\cup " />
          <SymBtn text="\cap" value="\cap " />
          <SymBtn text="\ast" value="\ast " />
          <SymBtn text="\sqcup" value="\sqcup " />
          <SymBtn text="\sqcap" value="\sqcap " />
          <SymBtn text="\circ" value="\circ " />
          <SymBtn text="\vee" value="\vee " />
          <SymBtn text="\wedge" value="\wedge " />
          <SymBtn text="\bullet" value="\bullet " />
          <SymBtn text="\oplus" value="\oplus " />
          <SymBtn text="\ominus" value="\ominus " />
          <SymBtn text="\diamond" value="\diamond " />
          <SymBtn text="\odot" value="\odot " />
          <SymBtn text="\oslash" value="\oslash " />
          <SymBtn text="\uplus" value="\uplus " />
          <SymBtn text="\otimes" value="\otimes " />
          <SymBtn text="\bigcirc" value="\bigcirc " />
          <SymBtn text="\amalg" value="\amalg " />
          <SymBtn text="\bigtriangleup" value="\bigtriangleup " />
          <SymBtn text="\bigtriangledown" value="\bigtriangledown " />
          <SymBtn text="\dagger" value="\dagger " />
          <SymBtn text="\lhd" value="\lhd " />
          <SymBtn text="\rhd" value="\rhd " />
          <SymBtn text="\ddagger" value="\ddagger " />
          <SymBtn text="\unlhd" value="\unlhd " />
          <SymBtn text="\unrhd" value="\unrhd " />
          <SymBtn text="\wr" value="\wr " />
        </div>
        <p>
          Binary Operators
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn text="\sum" value="\sum_{}^{}" caretPosition={6} />
        <SymBtn text="\bigcup" value="\bigcup_{}^{}" caretPosition={9} />
        <SymBtn text="\bigvee" value="\bigvee_{}^{}" caretPosition={9} />
        <SymBtn text="\bigoplus" value="\bigoplus_{}^{}" caretPosition={11} />
        <div className="absolute z-10 hidden grid-cols-4 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn text="\prod" value="\prod_{}^{}" caretPosition={7} />
          <SymBtn text="\bigcap" value="\bigcap_{}^{}" caretPosition={9} />
          <SymBtn text="\bigwedge" value="\bigwedge_{}^{}" caretPosition={10} />
          <SymBtn
            text="\bigotimes"
            value="\bigotimes_{}^{}"
            caretPosition={12}
          />
          <SymBtn text="\coprod" value="\coprod_{}^{}" caretPosition={8} />
          <SymBtn text="\bigsqcup" value="\bigsqcup_{}^{}" caretPosition={11} />
          <span></span>
          <SymBtn text="\bigodot" value="\bigodot_{}^{}" caretPosition={10} />
          <SymBtn text="\int" value="\int_{}^{}" caretPosition={6} />
          <SymBtn text="\oint" value="\oint_{}^{}" caretPosition={7} />
          <span></span>
          <SymBtn text="\biguplus" value="\biguplus_{}^{}" caretPosition={10} />
        </div>
        <p>
          Big Operators
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn text="\gets" value="\gets " />
        <SymBtn text="\longleftarrow" value="\longleftarrow " />
        <SymBtn text="\uparrow" value="\uparrow " />
        <SymBtn text="\to" value="\to " />
        <SymBtn text="\longrightarrow" value="\longrightarrow " />
        <SymBtn text="\downarrow" value="\downarrow " />
        <div className="absolute z-10 hidden grid-cols-6 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn text="\leftrightarrow" value="\leftrightarrow " />
          <SymBtn text="\longleftrightarrow" value="\longleftrightarrow " />
          <SymBtn text="\updownarrow" value="\updownarrow " />
          <SymBtn text="\Leftarrow" value="\Leftarrow " />
          <SymBtn text="\Longleftarrow" value="\Longleftarrow " />
          <SymBtn text="\Uparrow" value="\Uparrow " />
          <SymBtn text="\Rightarrow" value="\Rightarrow " />
          <SymBtn text="\Longrightarrow" value="\Longrightarrow " />
          <SymBtn text="\Downarrow" value="\Downarrow " />
          <SymBtn text="\Leftrightarrow" value="\Leftrightarrow " />
          <SymBtn text="\Longleftrightarrow" value="\Longleftrightarrow " />
          <SymBtn text="\Updownarrow" value="\Updownarrow " />
          <SymBtn text="\mapsto" value="\mapsto " />
          <SymBtn text="\longmapsto" value="\longmapsto " />
          <SymBtn text="\nearrow" value="\nearrow " />
          <SymBtn text="\hookleftarrow" value="\hookleftarrow " />
          <SymBtn text="\hookrightarrow" value="\hookrightarrow " />
          <SymBtn text="\searrow" value="\searrow " />
          <SymBtn text="\leftharpoonup" value="\leftharpoonup " />
          <SymBtn text="\rightharpoonup" value="\rightharpoonup " />
          <SymBtn text="\swarrow" value="\swarrow " />
          <SymBtn text="\leftharpoondown" value="\leftharpoondown " />
          <SymBtn text="\rightharpoondown" value="\rightharpoondown " />
          <SymBtn text="\nwarrow" value="\nwarrow " />
          <SymBtn text="\rightleftharpoons" value="\rightleftharpoons " />
          <SymBtn text="\iff" value="\iff " />
          <SymBtn text="\leadsto" value="\leadsto " />
        </div>
        <p>
          Arrows
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn
          text="\left( \right)"
          value="\left(  \right)"
          caretPosition={7}
        />
        <SymBtn
          text="\left[ \right]"
          value="\left[  \right]"
          caretPosition={7}
        />
        <SymBtn
          text="\left\{ \right\}"
          value="\left\{  \right\}"
          caretPosition={8}
        />
        <SymBtn
          text="\left| \right|"
          value="\left|  \right|"
          caretPosition={7}
        />
        <div className="absolute z-10 hidden grid-cols-4 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn
            text="\left\lfloor \right\rfloor"
            value="\left\lfloor  \right\rfloor"
            caretPosition={13}
          />
          <SymBtn
            text="\left\lceil \right\rceil"
            value="\left\lceil  \right\rceil"
            caretPosition={12}
          />
          <SymBtn
            text="\left\lceil \right\rfloor"
            value="\left\lceil  \right\rfloor"
            caretPosition={12}
          />
          <SymBtn
            text="\left\langle \right\rangle"
            value="\left\langle  \right\rangle"
            caretPosition={13}
          />
          <SymBtn
            text="\left/ \right/"
            value="\left/  \right/"
            caretPosition={7}
          />
          <SymBtn
            text="\left\backslash \right\backslash"
            value="\left\backslash  \right\backslash"
            caretPosition={16}
          />
          <SymBtn
            text="\left\vert \right\vert"
            value="\left\vert  \right\vert"
            caretPosition={11}
          />
          <SymBtn
            text="\left\Vert \right\Vert"
            value="\left\Vert  \right\Vert"
            caretPosition={11}
          />
          <SymBtn
            text="\left\uparrow \right\downarrow"
            value="\left\uparrow  \right\downarrow"
            caretPosition={14}
          />
          <SymBtn
            text="\left\Uparrow \right\Downarrow"
            value="\left\Uparrow  \right\Downarrow"
            caretPosition={14}
          />
          <SymBtn
            text="\left\updownarrow \right\downarrow"
            value="\left\updownarrow  \right\downarrow"
            caretPosition={18}
          />
          <SymBtn
            text="\left\Updownarrow \right\Downarrow"
            value="\left\Updownarrow  \right\Downarrow"
            caretPosition={18}
          />
          <SymBtn
            text="\left\lgroup \right\rgroup"
            value="\left\lgroup  \right\rgroup"
            caretPosition={13}
          />
          <SymBtn
            text="\left\lmoustache \right\rmoustache"
            value="\left\lmoustache  \right\rmoustache"
            caretPosition={17}
          />
        </div>
        <p>
          Delimiters
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn text="\dots" value="\dots " />
        <SymBtn text="\cdots" value="\cdots " />
        <SymBtn text="\vdots" value="\vdots " />
        <SymBtn text="\ddots" value="\ddots " />
        <SymBtn text="\hbar" value="\hbar " />
        <div className="absolute z-10 hidden grid-cols-5 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn text="\imath" value="\imath " />
          <SymBtn text="\jmath" value="\jmath " />
          <SymBtn text="\ell" value="\ell " />
          <SymBtn text="\Re" value="\Re " />
          <SymBtn text="\Im" value="\Im " />
          <SymBtn text="\aleph" value="\aleph " />
          <SymBtn text="\wp" value="\wp " />
          <SymBtn text="\forall" value="\forall " />
          <SymBtn text="\exists" value="\exists " />
          <SymBtn text="\mho" value="\mho " />
          <SymBtn text="\partial" value="\partial " />
          <SymBtn text="'" value="' " />
          <SymBtn text="\prime" value="\prime " />
          <SymBtn text="\emptyset" value="\emptyset " />
          <SymBtn text="\infty" value="\infty " />
          <SymBtn text="\nabla" value="\nabla " />
          <SymBtn text="\triangle" value="\triangle " />
          <SymBtn text="\Box" value="\Box " />
          <SymBtn text="\Diamond" value="\Diamond " />
          <SymBtn text="\bot" value="\bot " />
          <SymBtn text="\top" value="\top " />
          <SymBtn text="\angle" value="\angle " />
          <SymBtn text="\surd" value="\surd " />
          <SymBtn text="\diamondsuit" value="\diamondsuit " />
          <SymBtn text="\heartsuit" value="\heartsuit " />
          <SymBtn text="\clubsuit" value="\clubsuit " />
          <SymBtn text="\spadesuit" value="\spadesuit " />
          <SymBtn text="\neg" value="\neg " />
          <SymBtn text="\flat" value="\flat " />
          <SymBtn text="\natural" value="\natural " />
          <SymBtn text="\sharp" value="\sharp " />
        </div>
        <p>
          Miscellaneous Symbols
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group/no-drawer">
        <SymBtn text="\dag" value="\dag " />
        <SymBtn text="\ddag" value="\ddag " />
        <SymBtn text="\S" value="\S " />
        <SymBtn text="\P" value="\P " />
        <SymBtn text="\copyright" value="\copyright " />
        <SymBtn text="\pounds" value="\pounds " />
        <p>Non-Mathematical Symbols</p>
      </div>
      <div className="group/no-drawer">
        <SymBtn text="\ulcorner" value="\ulcorner " />
        <SymBtn text="\urcorner" value="\urcorner " />
        <SymBtn text="\llcorner" value="\llcorner " />
        <SymBtn text="\lrcorner" value="\lrcorner " />
        <p>AMS Delimiters</p>
      </div>
      <div className="group/no-drawer">
        <SymBtn text="\digamma" value="\digamma " />
        <SymBtn text="\varkappa" value="\varkappa " />
        <SymBtn text="\beth" value="\beth " />
        <SymBtn text="\daleth" value="\daleth " />
        <SymBtn text="\gimel" value="\gimel " />
        <p>AMS Greek and Hebrew</p>
      </div>
      <div className="group">
        <SymBtn text="\lessdot" value="\lessdot " />
        <SymBtn text="\gtrdot" value="\gtrdot " />
        <SymBtn text="\doteqdot" value="\doteqdot " />
        <SymBtn text="\leqslant" value="\leqslant " />
        <SymBtn text="\geqslant" value="\geqslant " />
        <SymBtn text="\risingdotseq" value="\risingdotseq " />
        <div className="absolute z-10 hidden grid-cols-6 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn text="\eqslantless" value="\eqslantless " />
          <SymBtn text="\eqslantgtr" value="\eqslantgtr " />
          <SymBtn text="\fallingdotseq" value="\fallingdotseq " />
          <SymBtn text="\leqq" value="\leqq " />
          <SymBtn text="\geqq" value="\geqq " />
          <SymBtn text="\eqcirc" value="\eqcirc " />
          <SymBtn text="\lll" value="\lll " />
          <SymBtn text="\ggg" value="\ggg " />
          <SymBtn text="\circeq" value="\circeq " />
          <SymBtn text="\lesssim" value="\lesssim " />
          <SymBtn text="\gtrsim" value="\gtrsim " />
          <SymBtn text="\triangleq" value="\triangleq " />
          <SymBtn text="\lessapprox" value="\lessapprox " />
          <SymBtn text="\gtrapprox" value="\gtrapprox " />
          <SymBtn text="\bumpeq" value="\bumpeq " />
          <SymBtn text="\lessgtr" value="\lessgtr " />
          <SymBtn text="\gtrless" value="\gtrless " />
          <SymBtn text="\Bumpeq" value="\Bumpeq " />
          <SymBtn text="\lesseqgtr" value="\lesseqgtr " />
          <SymBtn text="\gtreqless" value="\gtreqless " />
          <SymBtn text="\thicksim" value="\thicksim " />
          <SymBtn text="\lesseqqgtr" value="\lesseqqgtr " />
          <SymBtn text="\gtreqqless" value="\gtreqqless " />
          <SymBtn text="\thickapprox" value="\thickapprox " />
          <SymBtn text="\preccurlyeq" value="\preccurlyeq " />
          <SymBtn text="\succcurlyeq" value="\succcurlyeq " />
          <SymBtn text="\approxeq" value="\approxeq " />
          <SymBtn text="\curlyeqprec" value="\curlyeqprec " />
          <SymBtn text="\curlyeqsucc" value="\curlyeqsucc " />
          <SymBtn text="\backsim" value="\backsim " />
          <SymBtn text="\precsim" value="\precsim " />
          <SymBtn text="\succsim" value="\succsim " />
          <SymBtn text="\backsimeq" value="\backsimeq " />
          <SymBtn text="\precapprox" value="\precapprox " />
          <SymBtn text="\succapprox" value="\succapprox " />
          <SymBtn text="\vDash" value="\vDash " />
          <SymBtn text="\subseteqq" value="\subseteqq " />
          <SymBtn text="\supseteqq" value="\supseteqq " />
          <SymBtn text="\Vdash" value="\Vdash " />
          <SymBtn text="\Subset" value="\Subset " />
          <SymBtn text="\Supset" value="\Supset " />
          <SymBtn text="\Vvdash" value="\Vvdash " />
          <SymBtn text="\sqsubset" value="\sqsubset " />
          <SymBtn text="\sqsupset" value="\sqsupset " />
          <SymBtn text="\backepsilon" value="\backepsilon " />
          <SymBtn text="\therefore" value="\therefore " />
          <SymBtn text="\because" value="\because " />
          <SymBtn text="\varpropto" value="\varpropto " />
          <SymBtn text="\shortmid" value="\shortmid " />
          <SymBtn text="\shortparallel" value="\shortparallel " />
          <SymBtn text="\between" value="\between " />
          <SymBtn text="\smallsmile" value="\smallsmile " />
          <SymBtn text="\smallfrown" value="\smallfrown " />
          <SymBtn text="\pitchfork" value="\pitchfork " />
          <SymBtn text="\vartriangleleft" value="\vartriangleleft " />
          <SymBtn text="\vartriangleright" value="\vartriangleright " />
          <SymBtn text="\blacktriangleleft" value="\blacktriangleleft " />
          <SymBtn text="\blacktriangleright" value="\blacktriangleright " />
          <SymBtn text="\trianglelefteq" value="\trianglelefteq " />
          <SymBtn text="\trianglerighteq" value="\trianglerighteq " />
        </div>
        <p>
          AMS Binary Relations
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
      <div className="group">
        <SymBtn text="\dashleftarrow" value="\dashleftarrow " />
        <SymBtn text="\dashrightarrow" value="\dashrightarrow " />
        <SymBtn text="\multimap" value="\multimap " />
        <SymBtn text="\leftleftarrows" value="\leftleftarrows " />
        <SymBtn text="\rightrightarrows" value="\rightrightarrows " />
        <SymBtn text="\upuparrows" value="\upuparrows " />
        <div className="absolute z-10 hidden grid-cols-6 rounded-b-lg bg-white shadow-lg group-hover:grid sm:border-b-1">
          <SymBtn text="\leftrightarrows" value="\leftrightarrows " />
          <SymBtn text="\rightleftarrows" value="\rightleftarrows " />
          <SymBtn text="\downdownarrows" value="\downdownarrows " />
          <SymBtn text="\Lleftarrow" value="\Lleftarrow " />
          <SymBtn text="\Rrightarrow" value="\Rrightarrow " />
          <SymBtn text="\upharpoonleft" value="\upharpoonleft " />
          <SymBtn text="\twoheadleftarrow" value="\twoheadleftarrow " />
          <SymBtn text="\twoheadrightarrow" value="\twoheadrightarrow " />
          <SymBtn text="\upharpoonright" value="\downharpoonleft " />
          <SymBtn text="\leftarrowtail" value="\leftarrowtail " />
          <SymBtn text="\rightarrowtail" value="\rightarrowtail " />
          <SymBtn text="\downharpoonleft" value="\downharpoonleft " />
          <SymBtn text="\leftrightharpoons" value="\leftrightharpoons " />
          <SymBtn text="\rightleftharpoons" value="\rightleftharpoons " />
          <SymBtn text="\downharpoonright" value="\upharpoonright " />
          <SymBtn text="\Lsh" value="\Lsh " />
          <SymBtn text="\Rsh" value="\Rsh " />
          <SymBtn text="\rightsquigarrow" value="\rightsquigarrow " />
          <SymBtn text="\looparrowleft" value="\looparrowleft " />
          <SymBtn text="\looparrowright" value="\looparrowright " />
          <SymBtn text="\leftrightsquigarrow" value="\leftrightsquigarrow " />
          <SymBtn text="\curvearrowleft" value="\curvearrowleft " />
          <SymBtn text="\curvearrowright" value="\curvearrowright " />
          <SymBtn text="\circlearrowleft" value="\circlearrowleft " />
          <SymBtn text="\circlearrowright" value="\circlearrowright " />
        </div>
        <p>
          AMS Arrows
          <TbArrowDownRight className="absolute bottom-0.5 right-0" />
        </p>
      </div>
    </ScrollShadow>
  );
};

export default ToolPanel;
