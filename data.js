/* GO-FAR course content.
   DRAFT teaching content — must be reviewed by fellowship faculty before use with fellows.
   Step types: read | hotspot | cards | quiz | case | tool */

window.COURSES = [
/* ------------------------------------------------------------------ */
{
  id: 'anat', code: 'GF-101', title: 'Periocular & Orbital Anatomy', color: '#0f8b8d', icon: '👁',
  level: 'Foundation', tagline: 'The surgical anatomy that every other module builds on.',
  modules: [
  { id: 'lid', title: 'Eyelid anatomy', minutes: 25, steps: [
    { type: 'read', title: 'Lamellae and layers', html: `<h3>Two lamellae</h3><ul><li><b>Anterior:</b> skin + orbicularis oculi (pretarsal, preseptal, orbital)</li><li><b>Posterior:</b> tarsus + conjunctiva (retractors attach at the tarsal border)</li></ul><div class="pearl"><span>💎 Pearl</span>Describe every lid problem by lamella: which one is short, lax or scarred?</div><h3>Orbital septum</h3><ul><li>Arises from the arcus marginalis; the barrier between lid and orbit</li><li>Fuses with the levator aponeurosis (upper lid) and capsulopalpebral fascia (lower lid)</li><li>Fuses about 3–5 mm above the tarsus in Caucasian lids; lower in many Asian lids, so the crease is lower or absent and fat sits lower</li></ul><div class="pearl"><span>💎 Pearl</span>Open the septum and the first thing you see is the preaponeurotic fat. The levator aponeurosis lies just behind it.</div><h3>Retractors</h3><ul><li><b>Upper:</b> levator (CN III) → aponeurosis → anterior tarsus and skin (forms the crease)</li><li><b>Upper:</b> Müller muscle (sympathetic, ≈ 2 mm of lift) → superior tarsal border</li><li><b>Lower:</b> capsulopalpebral fascia + inferior tarsal muscle</li></ul><div class="pearl"><span>💎 Pearl</span>Horner syndrome causes mild ptosis (Müller). A third nerve palsy causes severe ptosis (levator).</div><h3>Key numbers</h3><ul><li>Tarsal height ≈ 10 mm (upper), 4 mm (lower)</li><li>Vertical fissure ≈ 9–10 mm</li><li>Upper margin rests 1–2 mm below the superior limbus</li></ul>` },
    { type: 'hotspot', diagram: 'eyelid', title: 'Interactive: upper eyelid cross-section',
      intro: 'Schematic sagittal section of the right upper eyelid (anterior is to the left). Select a numbered marker to study each structure.',
      spots: [
        { x: 196, y: 140, sh: ['skin', 'orb'], t: 'Skin and orbicularis oculi', d: 'The anterior lamella. Orbicularis (CN VII) closes the lid. The preseptal and pretarsal portions contribute to the blink; the orbital portion to forced closure. Incisions in the crease are placed through skin and orbicularis to reach the septum.' },
        { x: 216, y: 105, sh: ['sept'], t: 'Orbital septum', d: 'A fibrous sheet from the arcus marginalis that fuses with the levator aponeurosis. Opening the septum exposes the preaponeurotic fat, the key landmark that tells you the aponeurosis lies just posterior to it.' },
        { x: 296, y: 112, sh: ['fat'], t: 'Preaponeurotic fat', d: 'Lies directly in front of the levator aponeurosis. Surgical landmark in ptosis repair and blepharoplasty. Do not confuse with the (more medial) nasal fat pad, which is paler in colour.' },
        { x: 280, y: 159, sh: ['apon'], t: 'Levator aponeurosis', d: 'Flat tendon of the levator that inserts on the anterior lower tarsus and fibers to the skin (the lid crease). Dehiscence or disinsertion is the commonest cause of acquired ptosis in adults.' },
        { x: 320, y: 158, sh: ['mull'], t: 'Müller muscle', d: 'Sympathetically innervated smooth muscle that provides ~2 mm of lid elevation. Basis of the phenylephrine test and of Müller muscle–conjunctival resection. Loss of sympathetic tone causes the mild ptosis of Horner syndrome.' },
        { x: 247, y: 252, sh: ['tars'], t: 'Tarsus', d: 'Dense connective-tissue plate giving the lid its shape and housing the meibomian glands. Upper tarsus is ~10 mm tall; the lower is ~4 mm.' },
        { x: 390, y: 92, sh: ['whit'], t: 'Whitnall ligament (superior transverse)', d: 'Condensation of the levator sheath at the muscle–aponeurosis junction. Acts as a fulcrum, changing the vector of pull from horizontal to vertical. Shortening it is an alternative to levator advancement in some techniques.' },
        { x: 560, y: 82, sh: ['lev'], t: 'Levator palpebrae superioris', d: 'Originates at the orbital apex (lesser wing of sphenoid), innervated by the superior division of CN III. Levator function (excursion from downgaze to upgaze with frontalis blocked) is the single most important number for planning ptosis surgery.' },
        { x: 282, y: 262, sh: ['conj'], t: 'Conjunctiva', d: 'Palpebral conjunctiva lines the tarsus, turns at the superior fornix and continues over the globe as bulbar conjunctiva.' },
        { x: 240, y: 330, sh: ['marg'], t: 'Lid margin, lashes and glands', d: 'Grey line separates anterior (lashes, glands of Zeis and Moll) from posterior lamella (meibomian orifices). The grey line is the surgical plane for splitting the lid margin.' }
      ] },
    { type: 'cards', title: 'Flashcards: eyelid essentials', cards: [
      ['Innervation of orbicularis oculi?', 'Facial nerve (CN VII). Paralysis → lagophthalmos, paralytic ectropion.'],
      ['Innervation of levator palpebrae superioris?', 'Superior division of the oculomotor nerve (CN III).'],
      ['Innervation of Müller muscle?', 'Sympathetic (superior cervical ganglion → carotid plexus).'],
      ['Which structure is the surgical landmark that lies just anterior to the levator aponeurosis?', 'The preaponeurotic fat pad.'],
      ['What forms the lid crease?', 'Fibers of the levator aponeurosis passing through orbicularis to insert on the skin.'],
      ['Typical upper tarsal height?', '≈ 10 mm (lower ≈ 4 mm).'],
      ['Posterior lamella of the eyelid consists of?', 'Tarsus and conjunctiva (with retractors).'],
      ['Lower lid retractors?', 'Capsulopalpebral fascia and inferior tarsal muscle.']
    ] },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'During an upper blepharoplasty you open the orbital septum. Which tissue is encountered first?', o: ['Levator muscle belly', 'Preaponeurotic fat', 'Müller muscle', 'Conjunctiva'], a: 1, why: 'The preaponeurotic fat lies between the septum and the levator aponeurosis.' },
      { q: 'A patient with Horner syndrome has 1–2 mm of ptosis. Which muscle has lost its innervation?', o: ['Levator palpebrae superioris', 'Müller muscle', 'Orbicularis oculi', 'Frontalis'], a: 1, why: 'Müller muscle is sympathetically innervated.' },
      { q: 'The posterior lamella of the eyelid comprises:', o: ['Skin and orbicularis', 'Tarsus and conjunctiva', 'Septum and fat', 'Skin and tarsus'], a: 1, why: 'Anterior lamella = skin + orbicularis; posterior = tarsus + conjunctiva.' },
      { q: 'Whitnall ligament is best described as:', o: ['A lateral canthal attachment', 'A condensation of the levator sheath acting as a fulcrum', 'The inferior retractor', 'A suspensory ligament of the lacrimal gland only'], a: 1, why: 'It is the superior transverse ligament, a fulcrum for the levator.' }
    ] }
  ]},
  { id: 'orbit', title: 'Bony orbit and neurovascular anatomy', minutes: 20, steps: [
    { type: 'hotspot', diagram: 'orbit', title: 'Interactive: the left orbit, frontal view',
      intro: 'Select a marker to review each wall, foramen and fissure. Medial is to the left.',
      spots: [
        { x: 240, y: 110, sh: ['roof'], t: 'Orbital roof', d: 'Frontal bone and lesser wing of the sphenoid. Thin; fractures are less common in adults and can occur with frontal sinus or skull base trauma. The lacrimal gland sits in its fossa anterolaterally.' },
        { x: 350, y: 240, sh: ['lat'], t: 'Lateral wall', d: 'Zygomatic bone and greater wing of the sphenoid. The thickest and strongest wall. Lateral orbitotomy and decompression use this wall.' },
        { x: 240, y: 370, sh: ['floor'], t: 'Orbital floor', d: 'Maxilla, zygomatic and palatine bones. Thin medial to the infraorbital groove, the typical site of blowout fractures.' },
        { x: 84, y: 170, sh: ['med'], t: 'Medial wall', d: 'Maxilla (frontal process), lacrimal, ethmoid (lamina papyracea) and sphenoid. Paper-thin ethmoid portion: fractures and spread of sinus infection (orbital cellulitis) occur here.' },
        { x: 172, y: 206, sh: ['optic'], t: 'Optic canal', d: 'In the lesser wing of the sphenoid. Transmits the optic nerve and ophthalmic artery. Traumatic optic neuropathy and compressive optic neuropathy in thyroid eye disease are apical problems.' },
        { x: 206, y: 232, sh: ['sof'], t: 'Superior orbital fissure', d: 'Between the greater and lesser wings. Transmits CN III, IV, VI, V1 branches (frontal, lacrimal, nasociliary) and the superior ophthalmic vein. Superior orbital fissure syndrome: ophthalmoplegia, ptosis, anaesthesia in V1 distribution, dilated pupil.' },
        { x: 290, y: 312, sh: ['iof'], t: 'Inferior orbital fissure', d: 'Between greater wing of sphenoid and maxilla. Transmits V2 (infraorbital and zygomatic nerves), inferior ophthalmic vein branches to the pterygoid plexus.' },
        { x: 158, y: 44, sh: ['notch'], t: 'Supraorbital notch / foramen', d: 'Palpable on the superior rim, at the junction of the medial and middle thirds, ≈ 2.5 cm from the midline. Supraorbital nerve and artery; a landmark for local anaesthetic block and brow incisions.' },
        { x: 240, y: 462, sh: ['infra'], t: 'Infraorbital foramen', d: '≈ 4–10 mm below the inferior rim. Infraorbital hypoaesthesia is an important sign of orbital floor or zygomaticomaxillary complex fracture.' },
        { x: 96, y: 248, sh: ['fossa'], t: 'Lacrimal fossa', d: 'Between the anterior and posterior lacrimal crests (maxilla and lacrimal bones). Houses the lacrimal sac; the starting point for dacryocystorhinostomy.' }
      ] },
    { type: 'read', title: 'Clinical pearls', html: `<h3>Shape and walls</h3><ul><li>Pyramid with its apex pointing posteromedially</li><li>Medial walls are nearly parallel; lateral walls ≈ 90° apart</li><li><b>Strongest:</b> lateral wall. <b>Weakest:</b> floor and medial wall (lamina papyracea)</li></ul><div class="pearl"><span>💎 Pearl</span>Thin bone explains the injuries: blowout fractures (floor, medial wall) and sinus infection spreading into the orbit (ethmoid).</div><h3>Surgical safety</h3><ul><li>The posterior orbit is the danger zone: dissection beyond ≈ 25 mm from the rim risks the optic nerve and apex</li><li>The ethmoidal foramina lie along the frontoethmoidal suture: 24 mm to the anterior, 12 mm further to the posterior, 6 mm further to the optic canal (variable)</li></ul><div class="pearl"><span>💎 Pearl</span>24–12–6: use the ethmoidal foramina as a map to the optic canal, but expect variation.</div><h3>Clinical signs</h3><ul><li><b>Preseptal vs orbital cellulitis:</b> the septum is the divider. Pain on movement, restricted motility, proptosis or RAPD means orbital.</li><li><b>Infraorbital numbness:</b> think floor or zygomaticomaxillary fracture</li><li><b>Superior orbital fissure syndrome:</b> ophthalmoplegia, ptosis, dilated pupil, V1 anaesthesia</li></ul><div class="pearl"><span>💎 Pearl</span>Orbital signs plus a dilated, non-reactive pupil after trauma point to the fissure or apex, not the floor.</div>` },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'Which nerve passes through the inferior orbital fissure and becomes the infraorbital nerve?', o: ['V1', 'V2', 'V3', 'CN VII'], a: 1, why: 'The maxillary division (V2).' },
      { q: 'Which orbital wall is the strongest?', o: ['Roof', 'Floor', 'Lateral wall', 'Medial wall'], a: 2, why: 'The lateral wall (zygomatic + greater wing of sphenoid).' },
      { q: 'A patient has ophthalmoplegia, ptosis, a dilated pupil and forehead anaesthesia after trauma. The most likely site of injury?', o: ['Optic canal', 'Superior orbital fissure', 'Infraorbital groove', 'Lacrimal fossa'], a: 1, why: 'Superior orbital fissure syndrome.' },
      { q: 'The thin bone of the medial wall through which sinus infection reaches the orbit is part of the:', o: ['Lacrimal bone', 'Palatine bone', 'Ethmoid bone', 'Zygomatic bone'], a: 2, why: 'The lamina papyracea of the ethmoid.' }
    ] }
  ]}
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'ptosis', code: 'GF-201', title: 'Blepharoptosis', color: '#7a5af8', icon: '⬆',
  level: 'Core', tagline: 'Systematic evaluation and surgical selection for the ptotic eyelid.',
  modules: [
  { id: 'eval', title: 'Evaluation of the ptotic lid', minutes: 30, steps: [
    { type: 'read', title: 'The measurements that matter', html: `<h3>Measure for both eyes, photograph in primary gaze</h3><ul><li><b>MRD1:</b> normal ≈ 4–5 mm; ≤ 2 mm is significant ptosis</li><li><b>Palpebral fissure height:</b> ≈ 9–10 mm</li><li><b>Levator function</b> (brow fixed): excellent ≥ 12 · good 8–11 · fair 5–7 · poor ≤ 4 mm</li><li><b>Crease height:</b> ≈ 8–10 mm (women), 6–8 mm (men); a high crease suggests aponeurotic dehiscence</li><li><b>Phenylephrine 2.5%:</b> lid rises ≥ 1–2 mm means Müller muscle is responsive</li><li><b>Bell phenomenon and tear film:</b> poor Bell or dry eye raises exposure risk</li></ul><div class="pearl"><span>💎 Pearl</span>Levator function is the number that picks the operation.</div><h3>Is it really just ptosis?</h3><ul><li><b>Fatigable or variable ptosis ± diplopia:</b> myasthenia gravis (ice-pack test, Cogan lid twitch, AChR antibodies)</li><li><b>Miosis + anhidrosis:</b> Horner syndrome</li><li><b>Dilated pupil or ophthalmoplegia:</b> third nerve palsy</li><li><b>Jaw-winking:</b> Marcus Gunn</li><li><b>Poor LF in a child:</b> amblyopia risk, act early</li><li><b>Pseudoptosis:</b> hypotropia, enophthalmos, dermatochalasis, contralateral retraction</li></ul><div class="pearl"><span>💎 Pearl</span>Fatigable ptosis is myasthenia until proven otherwise. A dilated pupil needs urgent neuro-imaging.</div>` },
    { type: 'tool', tool: 'ptosis', title: 'Interactive: surgical planning assistant' },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'A patient has MRD1 of 1 mm and levator function of 14 mm. How is the levator function classified?', o: ['Poor', 'Fair', 'Good', 'Excellent'], a: 3, why: '≥ 12 mm is excellent. The ptosis is moderate-to-severe despite excellent function, typical of aponeurotic dehiscence.' },
      { q: 'A 70-year-old with a high lid crease, thin upper lid and excellent levator function most likely has:', o: ['Congenital myogenic ptosis', 'Aponeurotic ptosis', 'Third nerve palsy', 'Horner syndrome'], a: 1, why: 'Involutional (aponeurotic) ptosis: high crease, thin lid, good LF.' },
      { q: 'Variable ptosis worse at the end of the day with intermittent diplopia should prompt evaluation for:', o: ['Blepharophimosis syndrome', 'Myasthenia gravis', 'Chronic progressive external ophthalmoplegia only', 'Dermatochalasis'], a: 1, why: 'Fatigable ptosis is myasthenia until proven otherwise.' },
      { q: 'Why is a poor Bell phenomenon important before ptosis surgery?', o: ['It predicts lid height', 'It increases risk of postoperative exposure keratopathy', 'It changes the phenylephrine response', 'It indicates levator disinsertion'], a: 1, why: 'Without upward eye rotation on lid closure the cornea is unprotected.' }
    ] }
  ]},
  { id: 'surgery', title: 'Choosing the operation', minutes: 30, steps: [
    { type: 'read', title: 'Procedure selection overview', html: `<h3>Driven by three things</h3><ul><li>Levator function</li><li>Amount of ptosis</li><li>Phenylephrine response</li></ul><p class="sample">Then modified by dry eye, Bell phenomenon, age and cause.</p><h3>Matching the operation</h3><ul><li><b>Mild ptosis (≈ ≤ 2 mm), positive phenylephrine, good LF:</b> Müller muscle–conjunctival resection</li><li><b>Aponeurotic dehiscence, good–excellent LF:</b> external levator advancement</li><li><b>Fair LF (5–7 mm):</b> levator resection (larger), consider adjustable techniques</li><li><b>Poor LF (≤ 4 mm):</b> frontalis suspension (fascia lata is most durable; silicone or other materials for young children or temporising)</li><li><b>Marcus Gunn:</b> levator disinsertion + sling when the wink bothers the patient</li></ul><div class="pearl"><span>💎 Pearl</span>Under-correct rather than over-correct when Bell phenomenon is poor or the tear film is compromised, and discuss revision.</div><h3>Congenital ptosis timing</h3><ul><li>Most children can wait</li><li>Operate early if the pupil is covered, there is a chin-up posture, or amblyopia is developing</li><li>Check refraction and treat astigmatic or anisometropic amblyopia</li></ul><div class="pearl"><span>💎 Pearl</span>A covered visual axis is a deadline: amblyopia sets the timing, not appearance.</div>` },
    { type: 'case', title: 'Case: the droopy eyelid', intro: 'Work through the case. Choose the best answer at each decision point.', stages: [
      { prompt: '<b>72-year-old woman</b>, gradual drooping of the right upper lid over 2 years, worse after cataract surgery. No diplopia or variability. Right MRD1 +1 mm, left +3.5 mm. Lid crease 11 mm on the right, 8 mm on the left. Levator function 14 mm bilaterally. Pupils equal, no ophthalmoplegia. What is the most likely diagnosis?',
        o: [{ t: 'Myasthenia gravis', ok: false, fb: 'No fatigability, variability or diplopia — less likely.' },
            { t: 'Involutional (aponeurotic) ptosis', ok: true, fb: 'Correct: high crease, preserved LF, onset after intraocular surgery (speculum/lid manipulation) are classic.' },
            { t: 'Congenital myogenic ptosis', ok: false, fb: 'Congenital myogenic ptosis has poor LF and lid lag in downgaze and starts in childhood.' }] },
      { prompt: 'Examination shows no dry eye signs, Bell phenomenon is good and the left lid rises when the right lid is manually elevated (Hering law). What do you do?',
        o: [{ t: 'Plan surgery without further testing', ok: false, fb: 'Test for Hering response — unmasking the left lid avoids a postoperative surprise.' },
            { t: 'Elevate the right lid manually and observe the left lid', ok: true, fb: 'Yes. If the left lid drops, it may require surgery too or the operation should be planned to avoid over-correction on the right.' },
            { t: 'Order MRI orbits', ok: false, fb: 'Not indicated with this classic presentation.' }] },
      { prompt: 'Her right MRD1 improves from +1 to +3 mm after 2.5% phenylephrine. Which operations are reasonable?',
        o: [{ t: 'Frontalis sling only', ok: false, fb: 'Reserved for poor LF; here LF is excellent.' },
            { t: 'External levator advancement or Müller muscle–conjunctival resection', ok: true, fb: 'Both are acceptable. The positive phenylephrine test supports MMCR; levator advancement is more adjustable with a high crease and thin aponeurosis.' },
            { t: 'Fasanella–Servat for 4 mm of ptosis', ok: false, fb: 'That procedure is for mild ptosis and gives limited, less predictable elevation.' }] }
    ] },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'A newborn has ptosis, LF 2 mm, and a chin-up head posture. Best next step?', o: ['Observe until age 8', 'Assess for amblyopia and plan early frontalis suspension if visual axis threatened', 'Phenylephrine test', 'Botulinum toxin'], a: 1, why: 'Visual axis occlusion or compensatory posture warrants early intervention.' },
      { q: 'Which approach is most appropriate for 4 mm of ptosis with LF of 3 mm?', o: ['Müller muscle–conjunctival resection', 'Frontalis suspension', 'Levator advancement', 'Observation'], a: 1, why: 'Poor LF ⇒ the frontalis becomes the lifting muscle.' },
      { q: 'A positive phenylephrine test is most useful for:', o: ['Diagnosing myasthenia', 'Selecting patients for Müller muscle–conjunctival resection', 'Predicting Bell phenomenon', 'Planning fascia lata harvest'], a: 1, why: 'It indicates a Müller muscle response.' }
    ] }
  ]}
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'malpos', code: 'GF-202', title: 'Eyelid Malposition', color: '#d9480f', icon: '↔',
  level: 'Core', tagline: 'Entropion, ectropion, retraction and the horizontal-laxity paradigm.',
  modules: [
  { id: 'ee', title: 'Entropion and ectropion', minutes: 25, steps: [
    { type: 'read', title: 'Classification and mechanisms', html: `<h3>Ectropion</h3><ul><li><b>Involutional:</b> horizontal ± medial canthal laxity</li><li><b>Paralytic:</b> CN VII palsy</li><li><b>Cicatricial:</b> shortage of the anterior lamella (burns, dermatitis, tumour)</li><li><b>Mechanical:</b> mass or oedema</li></ul><h3>Entropion</h3><ul><li><b>Involutional:</b> horizontal laxity + retractor dehiscence + orbicularis override</li><li><b>Cicatricial:</b> posterior lamellar shortage (trachoma, SJS, pemphigoid)</li><li><b>Congenital:</b> rare (tarsal kink)</li><li><b>Acute spastic:</b> irritation + orbicularis spasm</li></ul><h3>Office tests</h3><ul><li><b>Snap-back:</b> slow return means laxity</li><li><b>Distraction:</b> lid pulled > 6 mm from the globe means horizontal laxity</li><li><b>Medial canthal laxity:</b> lower punctum displaces laterally toward the limbus</li><li><b>Lateral canthal laxity:</b> rounded lateral canthus, > 2 mm lateral displacement</li><li><b>Cicatricial entropion:</b> shortened fornix, symblepharon</li></ul><div class="pearl"><span>💎 Pearl</span>Treat the mechanism, not the label: correct horizontal laxity, then the retractors in entropion.</div><h3>Principles of repair</h3><ul><li><b>Laxity:</b> lateral tarsal strip or canthoplasty</li><li><b>Entropion retractors:</b> Jones procedure / retractor plication; Quickert sutures are temporising</li><li><b>Cicatricial ectropion:</b> add vertical length (graft, flap, scar release)</li><li><b>Paralytic ectropion:</b> protect the cornea first (tarsorrhaphy, gold weight, canthoplasty)</li></ul><div class="pearl"><span>💎 Pearl</span>Tightening the lid alone will fail in cicatricial ectropion: the skin is short, not the tarsus.</div>` },
    { type: 'cards', title: 'Flashcards', cards: [
      ['Three components of involutional entropion?', 'Horizontal lid laxity, lower lid retractor dehiscence, and preseptal orbicularis overriding the pretarsal portion.'],
      ['Most common cause of ectropion in elderly?', 'Involutional (horizontal laxity of tarsoligamentous sling).'],
      ['Why does a lateral tarsal strip work?', 'It re-anchors a tightened, de-epithelialised tarsal strip to the periosteum at Whitnall tubercle, restoring horizontal tension.'],
      ['Cicatricial ectropion: key principle?', 'Replace or release vertical anterior lamellar deficiency (graft or flap).'],
      ['What is a temporising treatment for involutional entropion?', 'Quickert (everting) sutures or botulinum toxin to the pretarsal orbicularis.']
    ] },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'A lower lid distracts 9 mm from the globe and has a poor snap-back. Which finding does this indicate?', o: ['Retractor dehiscence only', 'Horizontal lid laxity', 'Cicatricial shortening', 'Orbital fat prolapse'], a: 1, why: 'More than ~6 mm of distraction indicates horizontal laxity.' },
      { q: 'A patient with burn scarring has ectropion. Lateral tarsal strip alone is likely to fail because:', o: ['The tarsus is too short', 'There is a vertical anterior lamellar deficiency', 'CN VII is damaged', 'The retractors are dehisced'], a: 1, why: 'Scar shortens the anterior lamella; it must be released or replaced.' },
      { q: 'Which procedure addresses the retractor dehiscence in involutional entropion?', o: ['Lateral tarsal strip only', 'Jones/retractor plication', 'Hughes flap', 'Cutler–Beard flap'], a: 1, why: 'Retractor reinsertion/plication restores the posterior pull.' }
    ] }
  ]}
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'aesth', code: 'GF-203', title: 'Blepharoplasty & Brow', color: '#c2255c', icon: '✂',
  level: 'Core', tagline: 'Safe, functional and aesthetic periocular rejuvenation.',
  modules: [
  { id: 'bleph', title: 'Patient assessment and safety', minutes: 20, steps: [
    { type: 'read', title: 'Assess before you cut', html: `<h3>Functional vs cosmetic</h3><ul><li>Functional: documented visual-field loss (with and without taping), head tilt, brow ptosis causing secondary dermatochalasis</li><li>Photographs and visual fields are often needed; criteria vary by country</li></ul><h3>Checklist</h3><ul><li><b>Brow position first</b></li><li><b>Ocular surface:</b> dry eye, lagophthalmos, Bell phenomenon; active meibomian dysfunction or thyroid eye disease raise risk</li><li><b>Hidden ptosis:</b> lift the redundant skin and recheck MRD1</li><li><b>Lower lid:</b> snap-back, distraction, negative vector</li><li><b>Medical:</b> anticoagulants, blood pressure, smoking, expectations</li></ul><div class="pearl"><span>💎 Pearl</span>A ptotic brow looks like dermatochalasis. Removing lid skin alone lowers the brow further.</div><div class="pearl warn"><span>⚠ Emergency</span>Severe pain, proptosis, vision loss and a tense orbit after blepharoplasty is retrobulbar haemorrhage. Open the wound, perform lateral canthotomy and cantholysis and evacuate the haematoma immediately. Do not wait for imaging.</div><h3>Common complications</h3><ul><li>Lagophthalmos and dry eye</li><li>Asymmetry</li><li>Lower lid retraction or ectropion (over-excision, laxity)</li><li>Crease problems and unmasked ptosis</li><li>Infection; rarely visual loss</li></ul><div class="pearl"><span>💎 Pearl</span>Conserve skin on the lower lid: lax lids plus aggressive excision equals retraction.</div>` },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'Which finding should most change your plan before an upper blepharoplasty?', o: ['A ptotic brow', 'A well-defined crease', 'Mild tearing in wind', 'Contact-lens use'], a: 0, why: 'Brow ptosis should be addressed; skin excision alone worsens it.' },
      { q: 'Severe pain, proptosis and decreased vision 3 hours after blepharoplasty. First action?', o: ['MRI orbits', 'Topical steroids', 'Bedside decompression: open wound ± lateral canthotomy and cantholysis', 'Observe overnight'], a: 2, why: 'Retrobulbar haemorrhage is a vision-threatening emergency.' },
      { q: 'After lifting the redundant skin, MRD1 improves by 2 mm. This suggests:', o: ['Pseudoptosis from dermatochalasis', 'Complete levator failure', 'Horner syndrome', 'Enophthalmos'], a: 0, why: 'Skin overhang can mimic or mask ptosis.' }
    ] }
  ]}
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'orb', code: 'GF-301', title: 'Orbital Trauma & Thyroid Eye Disease', color: '#1971c2', icon: '◎',
  level: 'Advanced', tagline: 'Time-critical decisions in the orbit.',
  modules: [
  { id: 'trauma', title: 'Orbital fractures and compartment syndrome', minutes: 35, steps: [
    { type: 'read', title: 'Assessment of orbital trauma', html: `<h3>First, find the threats to vision and life</h3><ul><li>Acuity, pupils (RAPD), IOP, dilated fundus: exclude globe rupture and traumatic optic neuropathy</li><li><b>Orbital compartment syndrome:</b> proptosis, tense orbit, raised IOP, RAPD, ophthalmoplegia</li><li>Associated head, cervical spine and facial injuries; CSF leak</li></ul><div class="pearl warn"><span>⚠ Emergency</span>Compartment syndrome is a clinical diagnosis. Perform lateral canthotomy and inferior cantholysis immediately, before imaging.</div><h3>Floor and blowout fractures</h3><ul><li>Signs: diplopia on up/down gaze, limited elevation, infraorbital hypoaesthesia, enophthalmos or hypoglobus, subcutaneous emphysema</li><li>Imaging: thin-cut CT with coronal and sagittal reformats; look for the hanging-drop sign</li></ul><div class="pearl"><span>💎 Pearl</span>Subcutaneous emphysema: tell the patient not to blow their nose.</div><h3>Timing of repair</h3><ul><li><b>Paediatric “white-eyed” trapdoor with entrapment, bradycardia, nausea/vomiting:</b> urgent, within 24–48 h</li><li><b>Entrapment with positive forced duction and CT evidence:</b> early, within about 2 weeks</li><li><b>Large floor defect or early enophthalmos/hypoglobus:</b> within about 2 weeks</li><li><b>Small, improving, no entrapment:</b> observe and review</li></ul><div class="pearl"><span>💎 Pearl</span>A quiet, white eye with vomiting after a ball injury in a child is entrapment until proven otherwise.</div>` },
    { type: 'case', title: 'Case: the injured orbit', intro: 'Make decisions in the order you would on call.', stages: [
      { prompt: '<b>26-year-old man</b>, punched in the left eye 3 hours ago. Severe pain, marked proptosis, tense lids, VA counting fingers, RAPD, IOP 48 mmHg, restricted motility. CT is available in 40 minutes. What now?',
        o: [{ t: 'Wait for CT before any intervention', ok: false, fb: 'Orbital compartment syndrome is a clinical diagnosis; delay risks permanent optic neuropathy.' },
            { t: 'Immediate lateral canthotomy and inferior cantholysis at the bedside', ok: true, fb: 'Correct. Release the canthal tendon until the lid is freely mobile; check IOP and vision after.' },
            { t: 'IV mannitol only and re-measure in 1 h', ok: false, fb: 'Medical measures are adjuncts, not substitutes for decompression.' }] },
      { prompt: 'After cantholysis IOP falls to 20 and vision improves. CT then shows a large orbital floor fracture with inferior rectus herniation but no further haematoma. What is the next consideration?',
        o: [{ t: 'Repair the floor defect electively when swelling subsides, depending on clinical findings', ok: true, fb: 'Yes — plan repair based on diplopia, forced ductions, defect size, and enophthalmos risk; typically within ~2 weeks.' },
            { t: 'Discharge with no follow-up', ok: false, fb: 'Needs monitoring for IOP, vision, motility and enophthalmos.' },
            { t: 'Immediate repair on the same night regardless of swelling', ok: false, fb: 'Not necessary unless there is ongoing compromise; surgery is easier after oedema settles.' }] },
      { prompt: 'A 9-year-old has vertical diplopia after a ball injury, minimal bruising, nausea and a heart rate of 48. CT shows a linear trapdoor floor fracture with inferior rectus entrapment. How urgent is surgery?',
        o: [{ t: 'Within hours: this is an emergency', ok: true, fb: 'Yes. Entrapment with oculocardiac reflex means ischaemia of muscle; release as soon as feasible (ideally < 24–48 h).' },
            { t: 'Wait 2 weeks', ok: false, fb: 'Delay risks permanent muscle damage and motility restriction.' },
            { t: 'Treat with oral steroids and observe', ok: false, fb: 'Not for entrapment with vagal signs.' }] }
    ] },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'Lateral canthotomy and cantholysis are indicated for:', o: ['Any orbital fracture', 'Orbital compartment syndrome with vision threat', 'Isolated infraorbital numbness', 'Preseptal cellulitis'], a: 1, why: 'To decompress a tense orbit with threatened optic nerve perfusion.' },
      { q: 'Which finding best suggests a trapdoor fracture in a child?', o: ['Marked periorbital bruising and proptosis', 'Minimal external signs, pain on eye movement, nausea, bradycardia and restricted up-gaze', 'Epistaxis', 'Complete ptosis'], a: 1, why: 'White-eyed blowout fracture.' },
      { q: 'Subcutaneous emphysema after orbital trauma means you should advise the patient to:', o: ['Blow their nose to clear it', 'Avoid nose blowing', 'Use a CPAP', 'Fly the next day'], a: 1, why: 'Nose blowing can force air into the orbit and worsen the condition.' }
    ] }
  ]},
  { id: 'ted', title: 'Thyroid eye disease', minutes: 30, steps: [
    { type: 'read', title: 'Thyroid eye disease: disease phases and management', html: `<h3>The disease</h3><ul><li>Autoimmune inflammatory orbitopathy; usually Graves, but also euthyroid and hypothyroid patients</li><li><b>Active (inflammatory) phase:</b> typically 6–24 months, then <b>inactive (fibrotic)</b></li></ul><h3>Assess two axes</h3><ul><li><b>Activity:</b> Clinical Activity Score; ≥ 3 of 7 means active</li><li><b>Severity:</b> mild, moderate-to-severe, or sight-threatening (optic neuropathy, corneal breakdown)</li></ul><div class="pearl"><span>💎 Pearl</span>Activity decides whether to give anti-inflammatory therapy. Severity decides how urgent it is.</div><h3>Management</h3><ul><li><b>Everyone:</b> stop smoking, achieve euthyroid state, lubricate; selenium for mild disease where deficient</li><li><b>Moderate-to-severe, active:</b> IV methylprednisolone, teprotumumab (watch hearing and glucose), other immunomodulators, selected radiotherapy</li><li><b>Sight-threatening:</b> urgent IV steroids ± urgent decompression</li><li><b>Inactive, rehabilitative surgery:</b> decompression → strabismus → eyelids</li></ul><div class="pearl"><span>💎 Pearl</span>Smoking is the strongest modifiable risk factor. Surgery order matters: each step changes the next.</div>` },
    { type: 'tool', tool: 'cas', title: 'Interactive: Clinical Activity Score calculator' },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'What is the recommended order of rehabilitative surgery in inactive TED?', o: ['Eyelid → strabismus → decompression', 'Decompression → strabismus → eyelid', 'Strabismus → eyelid → decompression', 'Any order'], a: 1, why: 'Decompression can change eye position and motility; strabismus surgery can change lid position.' },
      { q: 'A CAS of 4/7 means:', o: ['Inactive disease', 'Active disease', 'Sight-threatening disease', 'Only severe disease'], a: 1, why: 'A score of 3 or more of the 7 items defines active disease.' },
      { q: 'Which is the single most important modifiable risk factor for TED?', o: ['Iodine intake', 'Smoking', 'Alcohol', 'Contact lens use'], a: 1, why: 'Smoking increases the risk and severity and reduces treatment response.' }
    ] }
  ]}
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'lac', code: 'GF-302', title: 'Lacrimal Disorders', color: '#0b7285', icon: '💧',
  level: 'Core', tagline: 'From the punctum to the inferior meatus.',
  modules: [
  { id: 'nldo', title: 'The lacrimal drainage system and NLDO', minutes: 25, steps: [
    { type: 'hotspot', diagram: 'lacrimal', title: 'Interactive: lacrimal drainage system',
      intro: 'Schematic of the right lacrimal drainage pathway. Select the markers to trace the flow of tears from the lid margin to the nose.',
      spots: [
        { x: 318, y: 208, sh: ['pu'], t: 'Puncta', d: 'Upper and lower puncta ≈ 6 mm and 6.5 mm from the medial canthus, on the posterior lip of the lid margin. Punctal stenosis causes epiphora.' },
        { x: 374, y: 176, sh: ['ca'], t: 'Canaliculi', d: 'Vertical 2 mm, then horizontal 8 mm to the common canaliculus. Lacerations should be intubated and repaired where possible.' },
        { x: 410, y: 226, sh: ['cc'], t: 'Common canaliculus and valve of Rosenmüller', d: 'The upper and lower canaliculi usually join to form a common canaliculus, which enters the lateral wall of the sac. Valve of Rosenmüller is a mucosal fold at this junction that prevents reflux.' },
        { x: 432, y: 285, sh: ['sac'], t: 'Lacrimal sac', d: 'Sits in the lacrimal fossa. Dacryocystitis (acute or chronic) results from obstruction below the sac; mucocele forms when obstruction is complete.' },
        { x: 436, y: 420, sh: ['nld'], t: 'Nasolacrimal duct', d: 'Membranous duct within the bony canal, ≈ 12 mm. The most common site of obstruction in adults is the duct or sac/duct junction.' },
        { x: 440, y: 490, sh: ['has'], t: 'Valve of Hasner and inferior meatus', d: 'The distal opening of the duct under the inferior turbinate. In congenital NLDO, a persistent membrane at the valve of Hasner is the usual problem and often opens spontaneously in the first year.' },
        { x: 120, y: 82, sh: ['gl'], t: 'Lacrimal gland (production side)', d: 'Located in the lacrimal fossa of the frontal bone, superotemporal. Produces reflex aqueous tears; basal tears come from accessory glands (Krause, Wolfring).' }
      ] },
    { type: 'read', title: 'Evaluating the watery eye', html: `<h3>Work-up</h3><ul><li><b>Epiphora or reflex tearing?</b> dry eye, blepharitis, trichiasis, allergy, lagophthalmos</li><li><b>Lid position and puncta:</b> medial ectropion, laxity, punctal stenosis</li><li><b>Dye disappearance test</b> and tear meniscus height</li><li><b>Imaging</b> (dacryocystography, CT-DCG) for trauma, tumour or complex cases</li></ul><h3>Probing and irrigation</h3><ul><li><b>Soft stop:</b> canalicular</li><li><b>Hard stop:</b> bone</li><li><b>Reflux from the same punctum:</b> common canalicular block</li><li><b>Reflux from the opposite punctum:</b> nasolacrimal duct obstruction</li><li><b>No reflux:</b> punctal or canalicular block, or free flow</li></ul><div class="pearl"><span>💎 Pearl</span>The reflux pattern localises the block: same punctum = proximal, opposite punctum = at or below the common canaliculus.</div><h3>Congenital NLDO</h3><ul><li>Symptomatic in about 5–6% of newborns; most resolve by 12 months</li><li>First line: sac massage and treat infections</li><li>Office probing around 12 months if persisting; intubation, balloon dacryoplasty or DCR for failures</li></ul><div class="pearl"><span>💎 Pearl</span>Probe at about 12 months. Waiting beyond that lowers success and delays definitive treatment.</div><h3>Acquired NLDO</h3><ul><li>Surgical: <b>DCR</b> (external or endonasal) creates a bony ostium between sac and nose</li><li>Canalicular block may need a Jones tube</li></ul><div class="pearl warn"><span>⚠ Emergency</span>Acute dacryocystitis (painful swelling below the medial canthal tendon): systemic antibiotics and warm compresses, drain an abscess, then DCR after resolution.</div>` },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'A 10-month-old with persistent epiphora and mucous discharge has had massage for 4 months. Best next step?', o: ['Immediate DCR', 'Continue observation to age 5', 'Probing of the nasolacrimal duct, usually around 12 months', 'Bilateral Jones tubes'], a: 2, why: 'Persisting symptoms past ~12 months: office probing is first-line.' },
      { q: 'During syringing fluid refluxes through the opposite punctum. This localises obstruction to:', o: ['Upper canaliculus', 'Common canaliculus or lower system (sac/duct)', 'Punctum only', 'Lacrimal gland'], a: 1, why: 'Free canalicular passage with reflux from the other punctum implies obstruction at or beyond the common canaliculus/sac.' },
      { q: 'The valve at the distal end of the nasolacrimal duct is the:', o: ['Valve of Rosenmüller', 'Valve of Hasner', 'Valve of Krause', 'Valve of Whitnall'], a: 1, why: 'The valve of Hasner is distal; Rosenmüller is at the sac.' }
    ] }
  ]}
  ]
},

/* ------------------------------------------------------------------ */
{
  id: 'onc', code: 'GF-401', title: 'Eyelid Tumours & Reconstruction', color: '#5f3dc4', icon: '✚',
  level: 'Advanced', tagline: 'Recognising malignancy and restoring form and function.',
  modules: [
  { id: 'tumour', title: 'Eyelid tumours and reconstructive principles', minutes: 30, steps: [
    { type: 'read', title: 'Recognise the malignant lesion', html: `<h3>Key tumours</h3><ul><li><b>Basal cell carcinoma:</b> about 90% of eyelid malignancies; lower lid and medial canthus; pearly nodule, telangiectasia, rolled edge, madarosis</li><li><b>Squamous cell carcinoma:</b> more aggressive; perineural invasion and nodal spread; immunosuppression</li><li><b>Sebaceous carcinoma:</b> upper lid &gt; lower; masquerades as blepharitis or chalazion; pagetoid spread; consider Muir–Torre; map biopsy conjunctiva</li><li><b>Melanoma:</b> rare, most lethal; Breslow thickness defines prognosis</li></ul><div class="pearl"><span>💎 Pearl</span>Any recurrent “chalazion” in an adult, or lash loss with a distorted margin, needs a biopsy.</div><h3>Excision and reconstruction</h3><ul><li>Margin control: Mohs or frozen/permanent sections (3–5 mm margins for well-defined BCC)</li><li>Reconstruct <b>both lamellae</b>: only one can be a free graft; the other must be a vascularised flap</li><li><b>Upper lid:</b> ≤ 1/3 direct closure; ≥ 50%: Cutler–Beard or free tarsoconjunctival graft with a skin flap</li><li><b>Lower lid:</b> ≤ 1/3 direct closure; 1/3–1/2 semicircular (Tenzel) flap; ≥ 50%: Hughes flap + skin graft or flap</li></ul><div class="pearl"><span>💎 Pearl</span>One lamella can be a graft; the other must have its own blood supply.</div>` },
    { type: 'cards', title: 'Flashcards', cards: [
      ['Most common malignant eyelid tumour?', 'Basal cell carcinoma.'],
      ['Which malignancy masquerades as chronic blepharitis or recurrent chalazion?', 'Sebaceous carcinoma.'],
      ['Reconstructive principle: what two lamellae need?', 'One must be vascularised (flap); the other can be a free graft.'],
      ['Staged flap for lower lid defects > 50%?', 'Hughes tarsoconjunctival flap.'],
      ['Syndrome linking sebaceous neoplasms and visceral malignancies?', 'Muir–Torre syndrome.']
    ] },
    { type: 'quiz', title: 'Check your understanding', questions: [
      { q: 'A 68-year-old has a 6-month history of an upper lid "chalazion" with lash loss and thickening of the lid margin. Next step?', o: ['Repeat incision and curettage', 'Biopsy, including a map biopsy of conjunctiva', 'Topical steroids', 'Observe'], a: 1, why: 'Suspect sebaceous carcinoma.' },
      { q: 'Which flap is the classic repair for a large (> 50%) lower lid defect?', o: ['Cutler–Beard', 'Hughes tarsoconjunctival flap', 'Glabellar flap', 'Z-plasty'], a: 1, why: 'The Hughes flap provides posterior lamella for lower lid.' },
      { q: 'The Cutler–Beard flap is used for:', o: ['Upper lid defects > 50%', 'Lower lid defects', 'Lacrimal canalicular lacerations', 'Brow ptosis'], a: 0, why: 'It is a lid-sharing flap from the lower to the upper lid.' }
    ] }
  ]}
  ]
}
];

/* Regroup the original seven courses into three: Eyelid, Lacrimal and Orbit.
   Each module carries its own difficulty level (Foundation / Core / Advanced). */
(function () {
  const old = window.COURSES, find = (c, m) => old.find(x => x.id === c).modules.find(y => y.id === m);
  const mod = (c, m, title, level) => Object.assign({}, find(c, m), { title, level });
  window.COURSES = [
    { id: 'eyelid', code: 'GF-100', title: 'Eyelid', color: '#0f8b8d', icon: '👁', tagline: 'Anatomy, ptosis, malposition, blepharoplasty, and tumours and reconstruction.', modules: [
      mod('anat', 'lid', 'Eyelid anatomy', 'Foundation'),
      mod('ptosis', 'eval', 'Ptosis: evaluation', 'Core'),
      mod('ptosis', 'surgery', 'Ptosis: choosing the operation', 'Core'),
      mod('malpos', 'ee', 'Entropion and ectropion', 'Core'),
      mod('aesth', 'bleph', 'Blepharoplasty: assessment and safety', 'Core'),
      mod('onc', 'tumour', 'Eyelid tumours and reconstruction', 'Advanced')] },
    { id: 'lacrimal', code: 'GF-200', title: 'Lacrimal', color: '#0b7285', icon: '💧', tagline: 'From the punctum to the inferior meatus: anatomy, the watery eye and obstruction.', modules: [
      mod('lac', 'nldo', 'Lacrimal drainage system and NLDO', 'Core')] },
    { id: 'orbit', code: 'GF-300', title: 'Orbit', color: '#1971c2', icon: '◎', tagline: 'Bony and neurovascular anatomy, trauma, compartment syndrome and thyroid eye disease.', modules: [
      mod('anat', 'orbit', 'Bony orbit and neurovascular anatomy', 'Foundation'),
      mod('orb', 'trauma', 'Orbital fractures and compartment syndrome', 'Advanced'),
      mod('orb', 'ted', 'Thyroid eye disease', 'Advanced')] }
  ];
})();

/* Library — external links go to organisation home pages only. Verify before publishing. */
window.LIBRARY = [
  { type: 'Society', title: 'ASOPRS — American Society of Ophthalmic Plastic & Reconstructive Surgery', desc: 'Professional society: fellowship information, meetings, education resources.', url: 'https://www.asoprs.org' },
  { type: 'Society', title: 'ESOPRS — European Society of Ophthalmic Plastic & Reconstructive Surgery', desc: 'Courses, meetings and an international network of oculoplastic surgeons.', url: 'https://www.esoprs.org' },
  { type: 'Reference', title: 'AAO EyeWiki', desc: 'Peer-reviewed open ophthalmology encyclopedia, including oculoplastics topic pages.', url: 'https://eyewiki.org' },
  { type: 'Reference', title: 'American Academy of Ophthalmology — Education', desc: 'Preferred Practice Patterns, clinical statements, and the Basic and Clinical Science Course.', url: 'https://www.aao.org' },
  { type: 'Guideline', title: 'EUGOGO — European Group on Graves\' Orbitopathy', desc: 'Consensus statements on the management of Graves orbitopathy and thyroid eye disease.', url: 'https://www.eugogo.eu' },
  { type: 'Journal', title: 'Ophthalmic Plastic & Reconstructive Surgery (journal)', desc: 'Official journal of ASOPRS; case series, technique and outcomes.', url: 'https://journals.lww.com/op-rs' },
  { type: 'Organisation', title: 'ORBIS International', desc: 'Global non-profit training partner for eye care. Hosts the Cybersight telemedicine and education platform.', url: 'https://www.orbis.org' },
  { type: 'Textbook', title: 'BCSC Section 7: Oculofacial Plastic and Orbital Surgery', desc: 'Core fellowship reading — American Academy of Ophthalmology.', url: '' },
  { type: 'Textbook', title: 'Smith and Nesi\'s Ophthalmic Plastic and Reconstructive Surgery', desc: 'Comprehensive reference for surgical technique and anatomy.', url: '' },
  { type: 'Textbook', title: 'Oculoplastic, Orbital and Reconstructive Surgery (Hornblass & Hanig, eds.)', desc: 'Multi-volume operative reference. Confirm edition availability for your library.', url: '' }
];

/* Fellowship at a glance — fellowship programme schedule (from the programme's schedule slide). */
window.YEAR = [
  { from: 1, to: 3, label: 'Months 1–3', rows: [
    { weeks: 'Month 1', kind: 'learn', t: 'Complete "Eyelid" online curriculum', href: '#/course/eyelid' },
    { weeks: 'Weeks 1–3', kind: 'clinic', t: 'Recruitment of OP patients' },
    { weeks: 'Week 4', kind: 'train', t: 'Hospital-based training #1', sub: 'Comprehensive' } ] },
  { from: 4, to: 6, label: 'Months 4–6', rows: [
    { weeks: 'Month 4', kind: 'learn', t: 'Complete "Lacrimal" online curriculum', href: '#/course/lacrimal' },
    { weeks: 'Weeks 1–3', kind: 'clinic', t: 'Recruitment of OP patients' },
    { weeks: 'Week 4', kind: 'train', t: 'Hospital-based training #2', sub: 'Comprehensive' } ] },
  { from: 7, to: 7, label: 'Month 7', rows: [
    { weeks: 'Month 7', kind: 'learn', t: 'Complete "Orbit" online curriculum', href: '#/course/orbit' },
    { weeks: 'Weeks 1–3', kind: 'obs', t: 'Observership at John A. Moran Eye Center', sub: 'Preceptors: to be added' },
    { weeks: 'Week 4', kind: 'conf', t: 'Annual fall ASOPRS/AAO conference' } ] },
  { from: 8, to: 10, label: 'Months 8–10', rows: [
    { weeks: 'Weeks 1–3', kind: 'clinic', t: 'Recruitment of OP patients' },
    { weeks: 'Week 4', kind: 'train', t: 'Hospital-based training #3', sub: 'Orbit' } ] },
  { from: 10, to: 12, label: 'Months 10–12', rows: [
    { weeks: 'Weeks 1–3', kind: 'clinic', t: 'Recruitment of OP patients' },
    { weeks: 'Week 4', kind: 'train', t: 'Hospital-based training #4', sub: 'Pediatrics' } ] }
];

/* 6-month programme: months 1–3 mirror the 12-month months 1–3, month 4 is the Moran observership, months 5–6 mirror 12-month months 4–6. */
window.YEAR6 = [
  { from: 1, to: 3, label: 'Months 1–3', rows: [window.YEAR[0].rows[0], { weeks: 'Month 3', kind: 'learn', t: 'Complete "Lacrimal" online curriculum', href: '#/course/lacrimal' }, ...window.YEAR[0].rows.slice(1)] },
  { from: 4, to: 4, label: 'Month 4', rows: [{ weeks: 'Month 4', kind: 'learn', t: 'Complete "Orbit" online curriculum', href: '#/course/orbit' }, ...window.YEAR[2].rows.filter(r => r.kind !== 'learn')] },
  { from: 5, to: 6, label: 'Months 5–6', rows: window.YEAR[1].rows.slice(1) }
];

/* Clinical goals — adapted from the ICO Subspecialty Curriculum for Training in Ophthalmic and Facial Plastic Surgery
   (International Council of Ophthalmology, 2016; adaptation permitted for non-commercial use with credit to the ICO).
   lvl: M = must have/required, S = should have, A = additional training, E = expected competency (no letter in source). */
window.CGOALS = [
  { title: 'Training targets', note: 'Per year of fellowship', items: [
    { id: 'n-enc', lvl: 'M', t: 'Patient encounters', d: 'Personally evaluate and plan treatment for patient encounters with oculoplastic problems', n: 1200, unit: 'patient encounters / year' } ] },
  { title: 'Examination skills', items: [
    { id: 'ex-lid', lvl: 'M', t: 'Eyelid position exam', d: 'Examine upper and lower eyelid position: dermatochalasis, retraction, entropion, ectropion, ptosis and eyelid tumours' },
    { id: 'ex-lac', lvl: 'M', t: 'Lacrimal and nasal exam (speculum, endoscope)', d: 'Examine the lacrimal system, including nasal examination with speculum and endoscope' },
    { id: 'ex-brow', lvl: 'M', t: 'Brow, face and midface exam', d: 'Examine the eyebrow and face: brow ptosis and paralysis, relation to dermatochalasis, effects of midface change on lower lid position, and aesthetic units' },
    { id: 'ex-orb', lvl: 'M', t: 'Orbital exam and measurement', d: 'Examine and measure orbital structures and function' },
    { id: 'ex-img', lvl: 'M', t: 'Imaging principles: X-ray, CT, MRI, ultrasound', d: 'Understand principles of plain films, CT, MRI and ultrasound of the head and neck, with emphasis on the orbit' },
    { id: 'ex-adv', lvl: 'M', t: 'Indications for advanced imaging', d: 'Know the indications for advanced imaging (CT, MRI, MRA, PET-CT, bone scan, arteriography, ultrasound)' },
    { id: 'ex-it', lvl: 'M', t: 'Literature search and retrieval', d: 'Use information technology to search and retrieve reference material, articles and abstracts' },
    { id: 'ex-ther', lvl: 'M', t: 'Indications and limits of therapies', d: 'Know the indications, use and limitations of pharmacological, radiological and surgical therapies for orbit, eyelid and lacrimal disorders' } ] },
  { title: 'Medical knowledge', items: [
    { id: 'k-anat', lvl: 'M', t: 'Orbit, eyelid, lacrimal and sinus anatomy', d: 'Anatomy and physiology of the orbit, eyelids, lacrimal system, nose, sinuses, and head and neck as they relate to the orbit and adnexa' },
    { id: 'k-orb-p', lvl: 'M', t: 'Pediatric orbital disease', d: 'Orbit in children: congenital anomalies, cellulitis, benign and malignant tumours, inflammation, vascular malformations' },
    { id: 'k-orb-a', lvl: 'M', t: 'Adult orbital disease', d: 'Orbit in adults: cellulitis, thyroid orbitopathy, pseudotumour, vasculitis, tumours (vascular, neural, lacrimal gland, fibro-osseous, lymphoid, metastatic), trauma, anophthalmic socket, skull base disease' },
    { id: 'k-lid', lvl: 'M', t: 'Eyelid disease and ptosis', d: 'Eyelid: congenital syndromes, inflammation, infection, trauma, ectropion, entropion, trichiasis, blepharoptosis' },
    { id: 'k-lid2', lvl: 'M', t: 'Retraction, tumours, facial palsy, aesthetics', d: 'Eyelid retraction, dermatochalasis, blepharochalasis, eyelid tumours, blepharospasm, facial nerve palsy, brow, midface and lower face function and aesthetics' },
    { id: 'k-lac', lvl: 'M', t: 'Lacrimal disorders', d: 'Lacrimal system: congenital and acquired tearing, lacrimal pump dysfunction, infection, tumours, trauma' },
    { id: 'k-surface', lvl: 'M', t: 'Ocular surface and exposure', d: 'Ocular surface: cicatricial disease, surface malignancy, management of corneal and conjunctival exposure and its relation to lids, midface and brow' },
    { id: 'k-graft', lvl: 'M', t: 'Graft-site anatomy', d: 'Regional anatomy of commonly used graft sites (cranial bone, ear, nose, temple, mouth, neck, abdomen, buttocks, legs, supraclavicular area, arm)' },
    { id: 'k-basic', lvl: 'M', t: 'Basic science and wound healing', d: 'Fundamentals of ocular and orbital anatomy, chemistry, physiology, microbiology, immunology and wound healing' },
    { id: 'k-histo', lvl: 'M', t: 'Histology and pathology', d: 'Histology and pathology of ocular, cutaneous and periocular disease, including dermatopathology' },
    { id: 'k-cosm', lvl: 'M', t: 'Cosmetic surgery, toxin and fillers', d: 'Cosmetic surgery fundamentals and complications: brow and midface, alloplastic implants, botulinum toxin A, fillers, laser and chemical resurfacing' },
    { id: 'k-trauma', lvl: 'S', t: 'Team approach to trauma', d: 'Team approach to orbital and periorbital trauma' },
    { id: 'k-tumor', lvl: 'S', t: 'Multidisciplinary tumour care', d: 'Multidisciplinary approach to ocular and orbital tumours (e.g. retinoblastoma, adnexal lymphoma, paranasal sinus carcinoma)' } ] }
];

/* Didactic and scholarly activity goals (own page on the task board). Adapted from the ICO curriculum, as above. */
window.DGOALS = [
  { title: 'Didactic and scholarly activity', items: [
    { id: 'n-lect', lvl: 'M', t: 'Lecture / discussion hours', d: 'Lecture / discussion hours', n: 100, unit: 'hours' },
    { id: 'research', lvl: 'M', t: 'Complete a research project', d: 'Plan and execute at least one research project' },
    { id: 'd-conf', lvl: 'M', t: 'Attend conferences, lectures and journal clubs', d: 'Participate in clinical conferences, didactic lectures and journal clubs, including case presentations' },
    { id: 'd-mm', lvl: 'S', t: 'Join M&M, pathology and radiology sessions', d: 'Contribute to morbidity and mortality sessions and to pathology and radiology sessions, as both leader/teacher and learner' },
    { id: 'd-doc', lvl: 'S', t: 'Document your participation', d: 'Document your participation (name of presentation, type, meeting, date, location)' },
    { id: 'd-pres', lvl: 'S', t: 'Present at a national or international meeting', d: 'Present a poster or oral communication at a national or international conference (during, or within one year of finishing, the fellowship)' } ] }
];

/* Surgical goals — key steps to complete during each procedure. DRAFT teaching checklists written from standard operative
   technique; faculty must review and adapt to their own technique. Procedure selection follows the procedures the ICO
   Subspecialty Curriculum for Ophthalmic and Facial Plastic Surgery (2016) lists for fellowship proficiency. */
window.SGOALS = [
  { title: 'Eyelid', procs: [
    { id: 'ptl', t: 'Ptosis: external levator advancement / resection', steps: ['Measure MRD1, levator function and crease; mark the crease', 'Local anesthetic, prep and drape; protect the cornea', 'Skin and orbicularis incision at the crease', 'Dissect to the septum and open it', 'Identify the preaponeurotic fat and levator aponeurosis', 'Advance or resect the aponeurosis; suture to anterior tarsus', 'Check height and contour with the patient sitting; adjust', 'Reform the crease and close the skin', 'Document lid height, contour and closure at follow-up'] },
    { id: 'mmcr', t: 'Ptosis: Müller muscle–conjunctival resection', steps: ['Document a positive phenylephrine test', 'Evert the upper lid and mark the resection', 'Clamp or suture-guard the Müller muscle and conjunctiva', 'Excise the Müller muscle and conjunctiva, preserving the tarsus', 'Close with a running suture; keep knots away from the cornea', 'Check height and contour; adjust if needed'] },
    { id: 'sling', t: 'Ptosis: frontalis suspension', steps: ['Choose the sling material (fascia lata, silicone or other)', 'Mark the brow and lid incision points', 'Make the incisions and create the tunnel', 'Pass the sling and secure it to the tarsus', 'Set the lid height and tie off', 'Close and protect the cornea'] },
    { id: 'bleph', t: 'Upper blepharoplasty', steps: ['Assess brow position, ocular surface and visual fields', 'Mark the crease and the skin ellipse (pinch test)', 'Local anesthetic with epinephrine', 'Excise skin ± orbicularis', 'Manage fat through the septum if indicated', 'Secure hemostasis', 'Close and check lid closure', 'Counsel on post-op care and warning signs (pain, vision loss)'] },
    { id: 'lts', t: 'Lateral tarsal strip / canthoplasty', steps: ['Assess horizontal laxity (snap-back, distraction)', 'Lateral canthotomy and inferior cantholysis', 'Split the lid and de-epithelialize the tarsal strip', 'Shorten the lid to the correct length', 'Anchor the strip to the periosteum inside the lateral orbital rim', 'Reform the lateral canthal angle and close', 'Check lid apposition and position'] },
    { id: 'ent', t: 'Involutional entropion repair', steps: ['Confirm horizontal laxity and retractor dehiscence', 'Make the lower lid incision and expose the retractors', 'Reattach or plicate the retractors to the tarsus', 'Correct horizontal laxity (e.g. lateral tarsal strip)', 'Close and confirm the lid is everted and the lashes are clear of the cornea'] },
    { id: 'lac-lid', t: 'Full-thickness eyelid laceration repair', steps: ['Examine the globe; exclude open-globe and other injuries', 'Irrigate, explore and conservatively debride', 'Identify canalicular involvement', 'Align the grey line and place margin sutures', 'Close the tarsus, then the skin', 'Give tetanus prophylaxis and antibiotics as indicated'] },
    { id: 'tars', t: 'Tarsorrhaphy', steps: ['Confirm the indication and the expected duration', 'Anesthetize and prepare the lid margins', 'Place the sutures (with bolsters if used)', 'Secure and check corneal coverage', 'Plan follow-up and release'] },
    { id: 'tumor', t: 'Eyelid tumor excision and reconstruction', steps: ['Plan excision with margin control (Mohs or frozen section)', 'Excise the tumor with appropriate margins', 'Confirm clear margins', 'Assess the defect size and lamellae involved', 'Choose and perform the reconstruction (direct closure, flap or graft)', 'Reconstruct posterior and anterior lamellae', 'Protect the cornea and plan follow-up'] }
  ] },
  { title: 'Lacrimal', procs: [
    { id: 'probe', t: 'Lacrimal irrigation and probing', steps: ['Dilate the punctum', 'Irrigate and interpret the reflux pattern', 'Probe the canaliculus (soft versus hard stop)', 'Probe the nasolacrimal duct to the nose', 'Confirm patency with irrigation'] },
    { id: 'intub', t: 'Lacrimal intubation', steps: ['Probe the system', 'Pass the silicone tube through the canaliculi', 'Retrieve the tube in the nose', 'Secure the tube and trim', 'Plan tube removal and follow-up'] },
    { id: 'canal', t: 'Canalicular laceration repair', steps: ['Identify the cut ends of the canaliculus', 'Place the stent (intubation)', 'Repair the canaliculus and pericanalicular tissue', 'Close the lid margin and skin', 'Plan stent removal'] },
    { id: 'dcr', t: 'External dacryocystorhinostomy (DCR)', steps: ['Prepare the nose with a decongestant', 'Incision over the anterior lacrimal crest', 'Expose the lacrimal fossa', 'Create the bony ostium', 'Create the sac and nasal mucosal flaps', 'Suture the flaps together', 'Intubate if indicated', 'Close and give nasal care instructions'] }
  ] },
  { title: 'Orbit and socket', procs: [
    { id: 'floor', t: 'Orbital floor fracture repair', steps: ['Review CT; perform forced duction test', 'Choose the approach (e.g. transconjunctival)', 'Incise the periosteum and dissect subperiosteally', 'Free the herniated tissue from the fracture', 'Place an implant spanning the defect', 'Repeat the forced duction test', 'Secure the implant and close', 'Check vision and motility after surgery'] },
    { id: 'cantho', t: 'Lateral canthotomy and cantholysis (emergency)', steps: ['Recognize orbital compartment syndrome', 'Anesthetize and clamp the lateral canthus', 'Perform the lateral canthotomy', 'Perform the inferior cantholysis until the lid is mobile', 'Recheck IOP and vision'] },
    { id: 'enuc', t: 'Enucleation', steps: ['Verify the correct eye and laterality (time-out)', 'Peritomy and isolate the rectus muscles', 'Detach the rectus muscles and cut the oblique muscles', 'Clamp and cut the optic nerve; remove the globe', 'Secure hemostasis', 'Place the orbital implant', 'Attach the muscles and close Tenon and conjunctiva', 'Place a conformer and dressing; send for pathology'] },
    { id: 'evisc', t: 'Evisceration', steps: ['Verify the correct eye and laterality (time-out)', 'Peritomy and remove the cornea', 'Remove the uveal contents and scrape the sclera', 'Irrigate', 'Place the implant', 'Close the sclera, Tenon and conjunctiva', 'Place a conformer and dressing'] }
  ] }
];

/* Qualifying exam / practice question bank. DRAFT — faculty must review every item.
   lv: 0 Foundation, 1 Core, 2 Advanced. topic = course id. a = index of the correct option in o (options are shuffled on screen). */
window.QBANK = [
  /* Foundation */
  { id: 'f1', lv: 0, topic: 'eyelid', q: 'Which muscle elevates the upper eyelid and is supplied by the oculomotor nerve (CN III)?', o: ['Orbicularis oculi', 'Levator palpebrae superioris', 'Müller muscle', 'Frontalis'], a: 1, why: 'The levator palpebrae superioris is supplied by the superior division of CN III. Müller muscle is sympathetic; orbicularis is CN VII.' },
  { id: 'f2', lv: 0, topic: 'eyelid', q: 'Which cranial nerve supplies the orbicularis oculi?', o: ['CN III', 'CN V1', 'CN VII', 'CN VI'], a: 2, why: 'The facial nerve (CN VII) supplies orbicularis; paralysis causes lagophthalmos and paralytic ectropion.' },
  { id: 'f3', lv: 0, topic: 'eyelid', q: 'What is the approximate normal margin–reflex distance 1 (MRD1)?', o: ['0–1 mm', '4–5 mm', '8–9 mm', '10–12 mm'], a: 1, why: 'The upper lid margin normally sits about 4–5 mm above the corneal light reflex; ≤ 2 mm is significant ptosis.' },
  { id: 'f4', lv: 0, topic: 'eyelid', q: 'What is the most common cause of acquired ptosis in older adults?', o: ['Myasthenia gravis', 'Aponeurotic (involutional) dehiscence', 'Horner syndrome', 'Third nerve palsy'], a: 1, why: 'Stretching or dehiscence of the levator aponeurosis is the commonest cause.' },
  { id: 'f5', lv: 0, topic: 'eyelid', q: 'What does ectropion mean?', o: ['Inward turning of the lid margin', 'Outward turning of the lid margin', 'Drooping of the upper lid', 'Retraction of the upper lid'], a: 1, why: 'Ectropion is outward turning; entropion is inward turning.' },
  { id: 'f6', lv: 0, topic: 'eyelid', q: 'Why should brow position be assessed before an upper blepharoplasty?', o: ['To plan the lash length', 'A ptotic brow can mimic dermatochalasis, and skin excision alone may worsen it', 'To choose the suture material', 'It does not affect planning'], a: 1, why: 'Brow ptosis can create apparent eyelid skin excess; excising skin alone can lower the brow further.' },
  { id: 'f7', lv: 0, topic: 'orbit', q: 'Which orbital wall is most commonly involved in an isolated blowout fracture?', o: ['Roof', 'Lateral wall', 'Floor', 'Apex'], a: 2, why: 'The thin orbital floor (and medial wall) typically fractures; the lateral wall is the strongest.' },
  { id: 'f8', lv: 0, topic: 'orbit', q: 'Which finding points to orbital (postseptal) cellulitis rather than preseptal cellulitis?', o: ['Eyelid redness', 'Pain on eye movement and proptosis', 'Mild lid swelling', 'Low-grade fever'], a: 1, why: 'Pain with eye movement, restricted motility, proptosis, or reduced vision indicate the orbit is involved.' },
  { id: 'f9', lv: 0, topic: 'lacrimal', q: 'Into which part of the nose does the nasolacrimal duct drain?', o: ['Superior meatus', 'Middle meatus', 'Inferior meatus', 'Nasopharynx'], a: 2, why: 'The duct opens under the inferior turbinate into the inferior meatus (valve of Hasner).' },
  { id: 'f10', lv: 0, topic: 'eyelid', q: 'Which is the most common malignant eyelid tumor?', o: ['Squamous cell carcinoma', 'Basal cell carcinoma', 'Sebaceous carcinoma', 'Melanoma'], a: 1, why: 'Basal cell carcinoma accounts for about 90% of eyelid malignancies, most often on the lower lid and medial canthus.' },
  /* Core */
  { id: 'c1', lv: 1, topic: 'eyelid', q: 'What forms the upper eyelid crease?', o: ['Orbicularis attachment to the tarsus', 'Levator aponeurosis fibers passing to the skin', 'The orbital septum', 'Müller muscle'], a: 1, why: 'Fibers of the levator aponeurosis pass through orbicularis to insert into the skin.' },
  { id: 'c2', lv: 1, topic: 'eyelid', q: 'A 70-year-old has MRD1 1 mm, levator function 12 mm, a high lid crease and a thin upper lid. Which procedure is most appropriate?', o: ['Frontalis suspension', 'External levator advancement', 'Botulinum toxin', 'Brow lift only'], a: 1, why: 'Good levator function with aponeurotic features is best treated by levator advancement.' },
  { id: 'c3', lv: 1, topic: 'eyelid', q: 'A child has 3 mm of congenital ptosis with levator function of 2 mm. Which procedure is the standard approach?', o: ['Müller muscle–conjunctival resection', 'Levator advancement', 'Frontalis suspension', 'Blepharoplasty'], a: 2, why: 'With poor levator function, the frontalis muscle must be used to lift the lid (sling).' },
  { id: 'c4', lv: 1, topic: 'eyelid', q: 'A lower lid distracts from the globe by more than which distance, indicating horizontal laxity?', o: ['2 mm', '4 mm', '6 mm', '12 mm'], a: 2, why: 'More than about 6 mm of distraction indicates horizontal laxity.' },
  { id: 'c5', lv: 1, topic: 'eyelid', q: 'Which is the key principle in repairing cicatricial ectropion after burns?', o: ['A lateral tarsal strip alone', 'Lengthen the anterior lamella with a graft or flap', 'A medial canthal sling only', 'Observation'], a: 1, why: 'The problem is vertical shortage of skin; tightening the lid alone will fail.' },
  { id: 'c6', lv: 1, topic: 'eyelid', q: 'Three hours after blepharoplasty, a patient has severe pain, proptosis and decreased vision. What is the first step?', o: ['Order an MRI', 'Open the wound and perform lateral canthotomy and cantholysis', 'Oral antibiotics', 'Reassure and review in the morning'], a: 1, why: 'This is retrobulbar hemorrhage, a vision-threatening emergency; decompress immediately.' },
  { id: 'c7', lv: 1, topic: 'orbit', q: 'On the 7-item Clinical Activity Score, thyroid eye disease is regarded as active at a score of:', o: ['1 or more', '3 or more', '5 or more', '7'], a: 1, why: 'A CAS of 3 or more of 7 indicates active inflammatory disease.' },
  { id: 'c8', lv: 1, topic: 'orbit', q: 'A 9-year-old has a trapdoor floor fracture with inferior rectus entrapment, nausea and a heart rate of 48. How urgent is surgery?', o: ['Within 2 weeks', 'Urgent, ideally within 24–48 hours', 'Observe for a month', 'Oral steroids only'], a: 1, why: 'Entrapment with an oculocardiac reflex needs urgent release to prevent muscle ischemia.' },
  { id: 'c9', lv: 1, topic: 'lacrimal', q: 'A child has persistent congenital nasolacrimal duct obstruction at 12 months despite massage. What is the usual next step?', o: ['Immediate DCR', 'Probing of the nasolacrimal duct', 'Jones tube', 'More massage for 3 years'], a: 1, why: 'Probing is first-line after about 12 months; intubation or DCR are for failures.' },
  { id: 'c10', lv: 1, topic: 'eyelid', q: 'A 68-year-old has an upper lid "chalazion" with lash loss that recurs after incision and curettage. What should you do?', o: ['Repeat incision and curettage', 'Biopsy, including map biopsy of the conjunctiva', 'Steroid injection', 'Antibiotics'], a: 1, why: 'Recurrent chalazion with lash loss in an older adult: suspect sebaceous carcinoma.' },
  /* Advanced */
  { id: 'a1', lv: 2, topic: 'eyelid', q: 'The lateral horn of the levator aponeurosis divides which structure?', o: ['The lacrimal gland into orbital and palpebral lobes', 'The superior oblique tendon', 'The lateral rectus', 'The optic nerve sheath'], a: 0, why: 'The lateral horn indents the lacrimal gland, separating the orbital and palpebral lobes.' },
  { id: 'a2', lv: 2, topic: 'eyelid', q: 'A patient has severe unilateral Marcus Gunn jaw-winking ptosis with a bothersome wink. What is the usual surgical approach?', o: ['Müller muscle–conjunctival resection', 'Unilateral levator resection', 'Levator disinsertion or excision with frontalis suspension', 'Observation'], a: 2, why: 'Removing the abnormal levator innervation and using a sling addresses both the ptosis and the wink.' },
  { id: 'a3', lv: 2, topic: 'eyelid', q: 'Before unilateral ptosis surgery, manual elevation of the ptotic lid makes the other lid drop. What does this imply?', o: ['The other lid has pseudoptosis only', 'Hering law has unmasked bilateral ptosis; plan or counsel for bilateral surgery', 'Myasthenia gravis is confirmed', 'The operation should be cancelled'], a: 1, why: 'Equal innervation (Hering law) can hide contralateral ptosis that appears after the ptotic side is corrected.' },
  { id: 'a4', lv: 2, topic: 'eyelid', q: 'Which combination best treats the mechanism of involutional lower lid entropion?', o: ['Quickert sutures alone as a permanent fix', 'Retractor repair with horizontal tightening', 'Hughes flap', 'Cutler–Beard flap'], a: 1, why: 'The mechanism is horizontal laxity plus retractor dehiscence (with orbicularis override); address both.' },
  { id: 'a5', lv: 2, topic: 'eyelid', q: 'In a patient with a negative vector and lower lid laxity, what most reduces the risk of retraction after lower blepharoplasty?', o: ['Aggressive skin excision', 'Add lateral canthal support and avoid excess skin removal', 'Remove more fat', 'Add laser resurfacing'], a: 1, why: 'Support the lid with canthopexy or tarsal strip and conserve skin to avoid retraction.' },
  { id: 'a6', lv: 2, topic: 'orbit', q: 'What is the usual order of rehabilitative surgery in inactive thyroid eye disease?', o: ['Eyelid, then strabismus, then decompression', 'Decompression, then strabismus, then eyelid', 'Strabismus, then eyelid, then decompression', 'Any order'], a: 1, why: 'Decompression changes globe position and motility; strabismus surgery changes lid position.' },
  { id: 'a7', lv: 2, topic: 'orbit', q: 'A patient with thyroid eye disease has falling vision, reduced color vision and an RAPD with a crowded orbital apex. What is the first-line management?', o: ['Observation', 'High-dose IV steroids, with urgent decompression if no prompt response', 'Radioiodine therapy', 'Strabismus surgery'], a: 1, why: 'This is dysthyroid optic neuropathy; treat urgently with IV methylprednisolone and decompress if inadequate response.' },
  { id: 'a8', lv: 2, topic: 'orbit', q: 'Which adverse effects should be monitored in a patient receiving teprotumumab?', o: ['Hyperglycemia and hearing impairment', 'Pulmonary fibrosis', 'Renal failure', 'Peripheral neuropathy'], a: 0, why: 'Teprotumumab (an IGF-1R inhibitor) is associated with hearing changes and hyperglycemia.' },
  { id: 'a9', lv: 2, topic: 'lacrimal', q: 'Which operation is used for symptomatic canalicular obstruction proximal to the sac when the canaliculi cannot be reconstructed?', o: ['External DCR alone', 'Conjunctivodacryocystorhinostomy with a Jones tube', 'Probing', 'Punctal plugs'], a: 1, why: 'A Jones tube bypasses the non-functional canaliculi.' },
  { id: 'a10', lv: 2, topic: 'eyelid', q: 'After Mohs surgery a patient has a 60% full-thickness lower lid defect. Which repair is appropriate?', o: ['Direct closure', 'Hughes tarsoconjunctival flap with skin graft or flap', 'Cutler–Beard flap', 'Healing by secondary intention only'], a: 1, why: 'Defects of more than half of the lower lid need posterior lamella replacement, such as a Hughes flap, with anterior lamella cover.' }
];
