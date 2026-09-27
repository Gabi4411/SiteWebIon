// Business details — all PLACEHOLDERS until the owner provides real ones.
export const siteConfig = {
  companyName: 'Musterbau',
  phoneDisplay: '+49 000 000 0000',
  phoneHref: '+490000000000',
  email: 'kontakt@example.com',
  whatsappNumber: '490000000000', // international format, digits only
  // Get a free key at https://web3forms.com (it is public by design, safe to commit).
  web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY',
}

export const isFormDemoMode = siteConfig.web3formsAccessKey.startsWith('YOUR_')
