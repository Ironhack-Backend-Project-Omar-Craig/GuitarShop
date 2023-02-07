const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const MONGO_URI = require("../db/index");

const data = [
  {
    productType: "electric guitar",
    productName: "Fender American Professional II Stratocaster",
    manufacturer: "Fender",
    model: "American Professional II Stratocaster",
    price: 1749.00,
    images: [
      "https://images.guitarguitar.co.uk/cdn/large/160/200723360452025f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
      ],
    colour: ["3 Tone Sunburst"],
    description:
      "The Fender American Professional II Strat HSS seen here in 3 Tone Sunburst MN, is the Stratocaster that does it all. This is a truly adaptable guitar that can let you do a full set without the need for multiple guitar changes. The newly designed pickups can go from heavy rock to pristine cleans; basically everything a working guitarist could need! Comfort has not been left out though, as can be felt by the rolled fingerboard edges and the Super Natural satin finish on the back of the Deep C neck profile. Add in a top grade tremolo bridge with bent steel saddles and you have one remarkable guitar.",
    frets: 22,
    pickups: "V-Mod II Pickups",
  },
  // {
  //   productType: "electric guitar",
  //   productName: "Gibson ES-335 Vintage",
  //   manufacturer: "Gibson",
  //   model: "ES-335 Vintage",
  //   price: 2499.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/170/220509385302008f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   colour: ["black"],
  //   description:
  //     "With its roots dating back to 1958, the Gibson ES-335 Vintage Ebony Left-Handed guitarguitar Exclusive sets a high standard with what has become an iconic design. This model takes its cues from the original but has updated it with some modern features that deliver superb tone and quality. A hand-rolled Rounded C mahogany neck is a comfortable and faithful historic touch. The T-Type pickups give a slightly different tonal flavour but maintain a sound that we all know and love. As you would expect from Gibson, the build quality is impressive and the Vintage Ebony finish gives that timeless look. The ES-335 has been the choice of many musicians over the years and continues to be favoured by many.",
  //   frets: 22,
  //   pickups: "Gibson T-Type Pickups",
  // },
  // {
  //   productType: "electric guitar",
  //   productName: "Ibanez Prestige AZ24047 7 String",
  //   manufacturer: "Ibanez",
  //   model: "Prestige AZ24047 7 String",
  //   price: 1699.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/170/201102363656025f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   reviews: [],
  //   colour: ["black"],
  //   description:
  //     "Fender Player Stratocaster MN is a guitar designed for serious musicians. Its look and feel are superbly streamlined, meaning it is a true pleasure to play and to hold. From the three Player Series Alnico 5 single coil pickups to the sleek maple neck and fretboard - everything is authentic. You'll be able to coax a bright, punchy, highly detailed tone from this guitar with ease. And it's easy to fall in love with its charming aesthetic. If you're looking for a model which will give your riffs that classic Stratocaster shine and sparkle - this is it.",
  //   frets: 22,
  //   pickups: "Player Series Alnico single coil",
  // },
  // {
  //   productType: "electric guitar",
  //   productName: "Fender Stratocaster",
  //   manufacturer: "Fender",
  //   model: "Fender Player Stratocaster MN Black",
  //   price: 649,
  //   images: [
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/366988/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/369609/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/369588/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/369589/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/369591/1200/preview.jpg",
  //   ],
  //   colour: ["black"],
  //   description:
  //     "Fender Player Stratocaster MN is a guitar designed for serious musicians. Its look and feel are superbly streamlined, meaning it is a true pleasure to play and to hold. From the three Player Series Alnico 5 single coil pickups to the sleek maple neck and fretboard - everything is authentic. You'll be able to coax a bright, punchy, highly detailed tone from this guitar with ease. And it's easy to fall in love with its charming aesthetic. If you're looking for a model which will give your riffs that classic Stratocaster shine and sparkle - this is it.",
  //   frets: 22,
  //   pickups: "Player Series Alnico single coil",
  // },
  // {
  //   productType: "electric guitar",
  //   productName: "Fender Stratocaster",
  //   manufacturer: "Fender",
  //   model: "Fender Player Stratocaster MN Black",
  //   price: 649,
  //   images: [
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/366988/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/369609/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/369588/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/369589/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/36/369591/1200/preview.jpg",
  //   ],
  //   colour: ["black"],
  //   description:
  //     "Fender Player Stratocaster MN is a guitar designed for serious musicians. Its look and feel are superbly streamlined, meaning it is a true pleasure to play and to hold. From the three Player Series Alnico 5 single coil pickups to the sleek maple neck and fretboard - everything is authentic. You'll be able to coax a bright, punchy, highly detailed tone from this guitar with ease. And it's easy to fall in love with its charming aesthetic. If you're looking for a model which will give your riffs that classic Stratocaster shine and sparkle - this is it.",
  //   frets: 22,
  //   pickups: "Player Series Alnico single coil",
  // },
  

  // {
  //   productType: "acoustic guitar",
  //   productName: "Yamaha F310",
  //   manufacturer: "Yamaha",
  //   model: "Yamaha F310 Acoustic, Natural",
  //   price: 129.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/160/06102513005018f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   reviews: [],
  //   colour: ["natural"],
  //   description:
  //     "The Yamaha F310 is everything you've been looking for. It combines superb value for money with Yamaha's long heritage of creating high-quality instruments. This F310 Acoustic is no exception to their meticulous standards. Explore a rich, dynamic, well-rounded tone. Versatile with a sweet, melodic character that allows you to play almost any genre or style with great ease. And, with a traditional dreadnought body, your acoustic voice is loud, full, and beautifully dynamic. Experience a smooth, slick feel thanks to a slim, comfortable neck that's easier on your fingertips. Melodic and extremely playable - you won't want to put it down.",
  //   frets: 20,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "acoustic guitar",
  //   productName: "Martin SC13E",
  //   manufacturer: "Martin",
  //   model: "SC13E",
  //   price: 1699.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/160/200117354342025f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   reviews: [],
  //   colour: ["natural"],
  //   description:
  //     "Martin have produced a revolutionary new design with the SC13E. It is definitely one to take notice of due to the plethora of player friendly features that this forward thinking model has to offer.",
  //   frets: 20,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "acoustic guitar",
  //   productName: "Taylor 224ce-K Deluxe Grand Auditorium",
  //   manufacturer: "Taylor",
  //   model: "224ce-K Deluxe Grand Auditorium",
  //   price: 1499.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/160/200110353882008f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   reviews: [],
  //   colour: ["natural"],
  //   description:
  //     "The Yamaha F310 is everything you've been looking for. It combines superb value for money with Yamaha's long heritage of creating high-quality instruments. This F310 Acoustic is no exception to their meticulous standards. Explore a rich, dynamic, well-rounded tone. Versatile with a sweet, melodic character that allows you to play almost any genre or style with great ease. And, with a traditional dreadnought body, your acoustic voice is loud, full, and beautifully dynamic. Experience a smooth, slick feel thanks to a slim, comfortable neck that's easier on your fingertips. Melodic and extremely playable - you won't want to put it down.",
  //   frets: 20,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "acoustic guitar",
  //   productName: "Yamaha F310",
  //   manufacturer: "Yamaha",
  //   model: "Yamaha F310 Acoustic, Natural",
  //   price: 125,
  //   images: [
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681431/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681433/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681434/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681435/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681436/1200/preview.jpg",
  //   ],
  //   colour: ["natural"],
  //   description:
  //     "The Yamaha F310 is everything you've been looking for. It combines superb value for money with Yamaha's long heritage of creating high-quality instruments. This F310 Acoustic is no exception to their meticulous standards. Explore a rich, dynamic, well-rounded tone. Versatile with a sweet, melodic character that allows you to play almost any genre or style with great ease. And, with a traditional dreadnought body, your acoustic voice is loud, full, and beautifully dynamic. Experience a smooth, slick feel thanks to a slim, comfortable neck that's easier on your fingertips. Melodic and extremely playable - you won't want to put it down.",
  //   frets: 20,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "acoustic guitar",
  //   productName: "Yamaha F310",
  //   manufacturer: "Yamaha",
  //   model: "Yamaha F310 Acoustic, Natural",
  //   price: 125,
  //   images: [
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681431/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681433/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681434/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681435/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681436/1200/preview.jpg",
  //   ],
  //   colour: ["natural"],
  //   description:
  //     "The Yamaha F310 is everything you've been looking for. It combines superb value for money with Yamaha's long heritage of creating high-quality instruments. This F310 Acoustic is no exception to their meticulous standards. Explore a rich, dynamic, well-rounded tone. Versatile with a sweet, melodic character that allows you to play almost any genre or style with great ease. And, with a traditional dreadnought body, your acoustic voice is loud, full, and beautifully dynamic. Experience a smooth, slick feel thanks to a slim, comfortable neck that's easier on your fingertips. Melodic and extremely playable - you won't want to put it down.",
  //   frets: 20,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "acoustic guitar",
  //   productName: "Yamaha F310",
  //   manufacturer: "Yamaha",
  //   model: "Yamaha F310 Acoustic, Natural",
  //   price: 125,
  //   images: [
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681431/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681433/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681434/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681435/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/68/681436/1200/preview.jpg",
  //   ],
  //   colour: ["natural"],
  //   description:
  //     "The Yamaha F310 is everything you've been looking for. It combines superb value for money with Yamaha's long heritage of creating high-quality instruments. This F310 Acoustic is no exception to their meticulous standards. Explore a rich, dynamic, well-rounded tone. Versatile with a sweet, melodic character that allows you to play almost any genre or style with great ease. And, with a traditional dreadnought body, your acoustic voice is loud, full, and beautifully dynamic. Experience a smooth, slick feel thanks to a slim, comfortable neck that's easier on your fingertips. Melodic and extremely playable - you won't want to put it down.",
  //   frets: 20,
  //   pickups: "n/a",
  // },
  

  // {
  //   productType: "amplifier",
  //   productName: "Fender Tone Master Princeton Reverb",
  //   manufacturer: "Fender",
  //   model: "Tone Master Princeton Reverb",
  //   price: 799.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/170/220906392140008f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   reviews: [],
  //   colour: ["black"],
  //   description: `The Tone Master Princeton Reverb is one of the most versatile and prized guitar amplifiers of all time. It’s versatile enough to go from the bedroom to the recording studio to the gig with the great sound and authentic vintage vibe that Fender players know and love. The Tone Master Princeton Reverb delivers classic Fender tone, reverb and tremolo; and it’s the perfect size for guitarists who want a moderately powered amplifier for any situation.`,
  //   frets: 0,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "amplifier",
  //   productName: "Blackstar Valve Combo",
  //   manufacturer: "Blackstar",
  //   model: "Blackstar HT-5R MkII Valve Combo Amp",
  //   price: 449.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/170/201120364214025f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   reviews: [],
  //   colour: ["black"],
  //   description: `Killer tones and innovative features make the HT-5R MkII the ultimate studio and practice valve amp. The MkII’s completely new design takes the performance of this award-winning tone machine to a whole new level. To make the HT-5R MkII sound full and toneful even at the lowest volume levels, we designed a low powered push-pull power amp which produces the crunch and break-up characteristics of a traditional 100W output stage, but at a much lower volume. This is achieved by the use of a 12BH7 dual triode valve in push-pull configuration producing 5 Watts output, which is rich in valve harmonics and compression.`,
  //   frets: 0,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "amplifier",
  //   productName: "Marshall MG15GFX 15 Watt Black and Gold Combo Practice Amp",
  //   manufacturer: "Marshall",
  //   model: "MG15GFX 15 Watt Black and Gold Combo Practice Amp",
  //   price: 159.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/150/180118321241008f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   reviews: [],
  //   colour: ["black"],
  //   description: `Killer tones and innovative features make the HT-5R MkII the ultimate studio and practice valve amp. The MkII’s completely new design takes the performance of this award-winning tone machine to a whole new level. To make the HT-5R MkII sound full and toneful even at the lowest volume levels, we designed a low powered push-pull power amp which produces the crunch and break-up characteristics of a traditional 100W output stage, but at a much lower volume. This is achieved by the use of a 12BH7 dual triode valve in push-pull configuration producing 5 Watts output, which is rich in valve harmonics and compression.`,
  //   frets: 0,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "amplifier",
  //   productName: "Blackstar Valve Combo",
  //   manufacturer: "Blackstar",
  //   model: "Blackstar HT-5R MkII Valve Combo Amp",
  //   price: 449,
  //   images: [
  //     "https://images.media-allrecipes.com/images/75131.jpg",
  //     "https://images.guitarguitar.co.uk/cdn/large/150/190110337378008f2.jpg",
  //     "https://images.guitarguitar.co.uk/cdn/large/150/190110337378008b.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   colour: ["black"],
  //   description: `Killer tones and innovative features make the HT-5R MkII the ultimate studio and practice valve amp. The MkII’s completely new design takes the performance of this award-winning tone machine to a whole new level. To make the HT-5R MkII sound full and toneful even at the lowest volume levels, we designed a low powered push-pull power amp which produces the crunch and break-up characteristics of a traditional 100W output stage, but at a much lower volume. This is achieved by the use of a 12BH7 dual triode valve in push-pull configuration producing 5 Watts output, which is rich in valve harmonics and compression.`,
  //   frets: 0,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "amplifier",
  //   productName: "Blackstar Valve Combo",
  //   manufacturer: "Blackstar",
  //   model: "Blackstar HT-5R MkII Valve Combo Amp",
  //   price: 449,
  //   images: [
  //     "https://images.media-allrecipes.com/images/75131.jpg",
  //     "https://images.guitarguitar.co.uk/cdn/large/150/190110337378008f2.jpg",
  //     "https://images.guitarguitar.co.uk/cdn/large/150/190110337378008b.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   colour: ["black"],
  //   description: `Killer tones and innovative features make the HT-5R MkII the ultimate studio and practice valve amp. The MkII’s completely new design takes the performance of this award-winning tone machine to a whole new level. To make the HT-5R MkII sound full and toneful even at the lowest volume levels, we designed a low powered push-pull power amp which produces the crunch and break-up characteristics of a traditional 100W output stage, but at a much lower volume. This is achieved by the use of a 12BH7 dual triode valve in push-pull configuration producing 5 Watts output, which is rich in valve harmonics and compression.`,
  //   frets: 0,
  //   pickups: "n/a",
  // },
  

  // {
  //   productType: "pedal",
  //   productName: "BOSS DS-1 Distortion",
  //   manufacturer: "BOSS",
  //   model: "DS-1 Distortion",
  //   price: 63.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/150/04052410171618f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   reviews: [],
  //   colour: ["white", "black", "pink"],
  //   description:
  //     "BOSS’s colourful stomp boxes are the most recognisable pedal range in existence. For over 40 years, guitarists from bedrooms to stadiums have put their boot down on a BOSS effect to transform their sound. Several models have passed into guitar legend and early examples can fetch extremely high prices. Happily, BOSS have maintained their stellar reputation for world-class effects in bomb-proof casing with their current range and have fended off the imitators for decades to remain the pre-eminent single pedal effects manufacturer in the business. If there’s an effect for guitar (or bass, vocals, keys…be creative!) then you can bet BOSS have a pedal of it in their range or even invented it outright! Every guitar player should get to experience the joy of selecting a pedal from BOSS’s exhaustive roster, plugging it in and unleashing their wildest sonic dreams.",
  //   frets: 0,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "pedal",
  //   productName: "Electro Harmonix Soul Food Transparent Overdrive",
  //   manufacturer: "Electro",
  //   model: "Harmonix Soul Food Transparent Overdrive",
  //   price: 89.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/150/14043011381558f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   colour: ["white", "black", "pink"],
  //   description:
  //     "The Soul Food is all about nailing that expensive boutique overdrive sound at a very reasonable price. We've tried it and we can tell you that the results are very satisfying indeed!",
  //   frets: 0,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "pedal",
  //   productName: "Ibanez TS9 Tubescreamer Reissue Overdrive",
  //   manufacturer: "Ibanez",
  //   model: "TS9 Tubescreamer Reissue Overdrive",
  //   price: 129.00,
  //   images: [
  //     "https://images.guitarguitar.co.uk/cdn/large/102/04031414113418f.jpg?h=500&maxwidth=770&scale=canvas&bg=ffffff&quality=70",
  //   ],
  //   colour: ["white", "black", "pink"],
  //   description:
  //     "The Tubescreamer is probably the most useful pedal a guitarist could own. It has a couple of distinct uses that render it essential regardless of your chosen genre. As an overdrive, it has a pleasing clip and cut that allows your guitar and amps' inherent tone to remain whilst giving them a distinct 'edge'. The TS9 is considered to be on the sharper sounding end of things, a little more harsh than say a TS808.",
  //   frets: 0,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "pedal",
  //   productName: "Boss Digital Delay",
  //   manufacturer: "BOSS",
  //   model: "Boss DD-3T Digital Delay",
  //   price: 130.25,
  //   images: [
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615443/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615444/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615445/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615447/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615448/1200/preview.jpg",
  //   ],
  //   colour: ["white", "black", "pink"],
  //   description:
  //     "An icon reborn. The Boss DD-3T Digital Delay Pedal is an enhanced version of the legendary DD-3. It maintains all of the distinctive, recognisable sound of the original - but with improved functionality that makes adding a touch of stunning delay to your music, completely simple. With delay times ranging from 12.5 to 800ms, there's a huge spectrum to play with. And if you need to quickly find the right sound, the delay has been split into three subdivisions for rapid setup. A relocated direct output jack next to the main output makes connecting the pedal in a wet/dry setup hassle free. And you can tap in delay tempos using the onboard switch. All in all, the DD-3T makes finding the right delay sound for you effortless.",
  //   frets: 0,
  //   pickups: "n/a",
  // },
  // {
  //   productType: "pedal",
  //   productName: "Boss Digital Delay",
  //   manufacturer: "BOSS",
  //   model: "Boss DD-3T Digital Delay",
  //   price: 130.25,
  //   images: [
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615443/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615444/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615445/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615447/1200/preview.jpg",
  //     "https://d1aeri3ty3izns.cloudfront.net/media/61/615448/1200/preview.jpg",
  //   ],
  //   colour: ["white", "black", "pink"],
  //   description:
  //     "An icon reborn. The Boss DD-3T Digital Delay Pedal is an enhanced version of the legendary DD-3. It maintains all of the distinctive, recognisable sound of the original - but with improved functionality that makes adding a touch of stunning delay to your music, completely simple. With delay times ranging from 12.5 to 800ms, there's a huge spectrum to play with. And if you need to quickly find the right sound, the delay has been split into three subdivisions for rapid setup. A relocated direct output jack next to the main output makes connecting the pedal in a wet/dry setup hassle free. And you can tap in delay tempos using the onboard switch. All in all, the DD-3T makes finding the right delay sound for you effortless.",
  //   frets: 0,
  //   pickups: "n/a",
  // },
];

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connection Made");
    Product.create(data);
  })
  .catch((error) => {
    console.log(error);
  });

