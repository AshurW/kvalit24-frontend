const images = [
  {
    description:
      "This is awesome 😉. Ut tempus dolor quis nibh maximus vehicula. Phasellus et varius mi, quis tempor sem. Integer posuere ligula vel lectus cursus hendrerit. Vivamus lacinia interdum ipsum at luctus. Duis et sagittis quam, id mattis lorem. Nunc eget elit tempus, rhoncus arcu eu, cursus ex. Phasellus vitae nibh vitae nisl placerat rhoncus et sit amet orci. Sed euismod ante purus. Aenean neque sem, malesuada a felis at, mattis sagittis risus. Etiam volutpat nibh sapien, a consectetur neque iaculis id. Nullam faucibus rutrum aliquet. Curabitur eget augue metus. Vivamus molestie elit at sapien auctor, eget convallis massa semper. Praesent sem nibh, egestas eu laoreet sed, egestas eu augue.",
    id: 1233211,
    imageURL:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 100,
    title: "Look at my Code",
  },
  {
    description: "Now that is something to put your eye 👀 on",
    id: 1233212,
    imageURL:
      "https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 321,
    title: "Front preview of my latest deployment",
  },
  {
    description: "Keeping it simple ♥️",
    id: 1233213,
    imageURL:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 32,
    title: "Latest image of my workstation",
  },
  {
    description: "Green pot for the zen feeling 🧘‍♀️",
    id: 1233214,
    imageURL:
      "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 543,
    title: "My computer and my pot",
  },
  {
    description: "The only way to learn something is to get started",
    id: 1233215,
    imageURL:
      "https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 543,
    title: "Est, sleep, code repeat",
  },
  {
    description: "Guess what Im building?",
    id: 1233216,
    imageURL:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 985,
    title: "Yet another shot of my laptop",
  },
  {
    description: "Keeping it cool with my 3 monitors. Productivity x 3",
    id: 1233217,
    imageURL:
      "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 465,
    title: "One screen is not enough",
  },
  {
    description: "Nothing more nothing less",
    id: 1233218,
    imageURL:
      "https://images.unsplash.com/photo-1591710668263-bee1e9db2a26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 85,
    title: "Just my MBP and my Plant",
  },
  {
    description: "Increase contrast and decrease colors",
    id: 1233219,
    imageURL:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 934,
    title: "Style with white",
  },
  {
    description: "Just an awesome post of our customer journey",
    id: 1233220,
    imageURL:
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1024&h=600&q=80",
    likes: 84,
    title: "Mapping out our customer journey",
  },
];

images.forEach((data) => {
	const container = document.createElement('div')
	container.id = data.id

	const image = document.createElement('img')
	image.src = data.imageURL
	image.alt = data.title

	container.appendChild(image)

	const title = document.createElement('h3')
	title.textContent = data.title

	container.appendChild(title)

	const likes = document.createElement('p')
	likes.textContent = "Likes: "

	const likeCount = document.createElement('span')
	likeCount.textContent = data.likes
	likes.appendChild(likeCount)
	container.appendChild(likes)

	const description = document.createElement('p')
	description.textContent = data.description
	container.appendChild(description)

	document.body.appendChild(container)
});
