// App definitions - all apps defined once with unique IDs
const apps = {
	workforce: {
		name: 'Timesheet',
		link: 'https://app-us8.wfs.cloud/#/hub',
		icon: './images/icons/workhub.svg',
		color1: '#067EB0',
		color2: '#034764'
	},
	loop: {
		name: 'Loop',
		link: 'https://loop.cloud.microsoft/',
		icon: './images/icons/loop.svg',
		color1: '#243B55',
		color2: '#141E30'
	},
	dccentral: {
		name: 'DC Central',
		link: 'https://dccentral.microsoft.com/workspace',
		icon: './images/icons/dccentral.svg',
		color1: '#ece9e6',
		color2: '#ffffff'
	},
	notetemplates: {
		name: 'Note Templates',
		link: 'https://aka.ms/templatemaster',
		icon: '',
		color1: '#E81123',
		color2: '#C50F1F'
	},
	cliche: {
		name: 'CLICHE',
		link: 'https://aka.ms/clichemaster',
		icon: '',
		color1: '#00B7C3',
		color2: '#038387'
	},
	dcat: {
		name: 'DCAT',
		link: 'https://aka.ms/dcat',
		icon: './images/icons/dcat.svg',
		color1: '#000000',
		color2: '#434343'
	},
	connects: {
		name: 'Connects',
		link: 'https://msconnect.microsoft.com/',
		icon: '',
		color1: '#000000',
		color2: '#434343'
	},
	icm: {
		name: 'IcM',
		link: 'https://portal.microsofticm.com/imp/v3/incidents/create',
		icon: './images/icons/icm.svg',
		color1: '#fdc830',
		color2: '#f37335'
	},
	alert: {
		name: 'Alert Button',
		link: 'https://dccentral.microsoft.com/alert-button?DDUROUTE=true',
		icon: './images/icons/alert.svg',
		color1: '#cb2d3e',
		color2: '#ef473a'
	},
	ehs: {
		name: 'EHS',
		link: 'https://microsoft.sharepoint.com/teams/EHSOneStop',
		icon: './images/icons/ehs.svg',
		color1: '#ee9ca7',
		color2: '#ffdde1'
	},
	mysignins: {
		name: 'My SignIns',
		link: 'https://aka.ms/mysignins',
		icon: './images/icons/signin.svg',
		color1: '#ece9e6',
		color2: '#ffffff'
	},
	enablon: {
		name: 'Enablon<br>Observations',
		link: 'https://www.enablon.ehs.microsoft.com/app/go.aspx?v=/IMS/AnalysisBBS&tm=1',
		icon: './images/icons/enablon.svg',
		color1: '#1d976c',
		color2: '#93f9b9'
	},
	careerhub: {
		name: 'Career Hub',
		link: 'https://aka.ms/careerhub',
		icon: '',
		color1: '#737373',
		color2: '#5A5A5A'
	},
	samalol: {
		name: 'SAMA LOL',
		link: 'https://aka.ms/samalol',
		icon: '',
		color1: '#FFB900',
		color2: '#D39300'
	},
	samait: {
		name: 'SAMA IT',
		link: 'https://microsoft.sharepoint.com/teams/SAMASDCIT/SitePages/ITHelpdeskHome.aspx',
		icon: './images/icons/it.svg',
		color1: '#000000',
		color2: '#0f9b0f'
	},
	navisphere: {
		name: 'Navisphere',
		link: 'https://online.chrobinson.com/#/dashboard',
		icon: '',
		color1: '#000000',
		color2: '#0f9b0f'
	},
	facilities: {
		name: 'Facilities Request',
		link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR4jhK9Bkb_RMlHjZknCqvvhUQ0lRTkVaQVRYM1ZNTTBHSUFMNU9aWkJHUy4u',
		icon: '',
		color1: '#FFB900',
		color2: '#D39300'
	}
};

// App lists - just reference app IDs
const lists = {
	Global: {
		SS: [
			'workforce',
			'loop',
			'dccentral',
			'notetemplates',
			'cliche',
			'dcat',
			'connects',
			'icm',
			'alert',
			'ehs',
			'mysignins',
			'enablon',
			'facilities',
			'careerhub'
		],
		IAM: [
			'dccentral',
			'loop',
			'workforce',
			'ehs',
			'connects',
			'icm',
			'navisphere',
			'facilities'
		]
	},
	SAMA: {
		SS: [
			'samalol',
			'samait'
		],
		IAM: [
			'samalol',
			'samait'
		]
	}
};
