// Vidéos par défaut par section — repli local tant que rien n'est géré dans Supabase.
// 3 proviennent de l'ancienne galerie du site, 9 de la chaîne officielle.

export interface DefaultVideo {
  youtubeId: string
  title: string
}

export const defaultVideos: Record<string, DefaultVideo[]> = {
  galerie: [
    // ── Ancienne galerie (sain-benin.org) ──
    { youtubeId: 'zG4hkH2Sjpo', title: 'Sain-Benin (présentation)' },
    { youtubeId: 'ebattfJkYkU', title: '17  Augustin 1' },
    { youtubeId: 'jMCzuutr7yY', title: '14' },

    // ── Chaîne officielle « Ferme école SAIN » ──
    {
      youtubeId: 'HR1WALBrX6A',
      title: 'A la découverte de la Ferme école SAIN de Kakanitchoé au Bénin (Adjohoun-Ouémé)',
    },
    { youtubeId: 'YqyEomOeKyw', title: 'La Ferme Ecole SAIN et la Fondation Collibri' },
    { youtubeId: 'zI-ZXgILGjo', title: 'La 23ième promotion des jeunes entrepreneurs de la Ferme École SAIN' },
    { youtubeId: '1qbu0Z0b4Ew', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { youtubeId: '6zjG2PlL0e4', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { youtubeId: 'ALYKlX-yHCI', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { youtubeId: 'g1tTBNIs8Do', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { youtubeId: 'oua2snW8qfw', title: 'Les jeunes formés à la Ferme-école SAIN parlent de leurs activités' },
    { youtubeId: 'hVuvXNtj4LI', title: 'Agriculture : destruction de la Ferme École SAIN de Kakanitchoé par une tempête' },
  ],
}
