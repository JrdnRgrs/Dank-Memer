exports.run = async function (Memer, msg, args) {
	let avatarurl = (msg.mentions.length > 0 ? msg.mentions[0].staticAvatarURL : msg.author.staticAvatarURL).replace('gif', 'png')
	const authorurl = (msg.mentions.length > 0 ? msg.author.staticAvatarURL : Memer.client.user.staticAvatarURL).replace('gif', 'png')
	if (['jpg', 'jpeg', 'gif', 'png', 'webp'].some(x => args.join(' ').includes(x))) {
		avatarurl = args.join(' ').replace(/gif|webp/g, 'png')
	}

	const data = await Memer.snek
		.get('http://get-ur-me.me/api/spank')
		.set('Api-Key', Memer.config.imgenKey)
		.set('data-src', JSON.stringify([`${avatarurl}`, `${authorurl}`]))

	if (data.status === 200) {
		await msg.channel.createMessage('', { file: data.body, name: 'spank.png' })
	} else {
		msg.channel.createMessage(`Error: ${data.text}`)
	}
}