import { PARTNER_LOGOS, PARTNER_TIERS } from './hackathonData';

const Logo = ({ partner, lead }) => (
    <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`sea-hack__logo${partner.dark ? ' sea-hack__logo--dark' : ''}${lead ? ' sea-hack__logo--lead' : ''}`}
        aria-label={`Visit ${partner.name}`}
    >
        <img src={partner.logo} alt={partner.name} />
    </a>
);

const HackathonPartners = () => (
    <section className="sea-hack__section section-animate" aria-labelledby="hack-partners-title">
        <div className="sea-hack__inner">
            <p className="sea-hack__index">07 / Partners</p>
            <h2 id="hack-partners-title" className="sea-hack__h2">WHO&apos;S IN THE ROOM.</h2>
            {PARTNER_TIERS.map((tier) => (
                <div className="sea-hack__tier" key={tier.tier}>
                    <h3>{tier.tier}</h3>
                    <div className="sea-hack__logo-grid">
                        {tier.partners.map((partner) => (
                            <Logo key={partner.name} partner={partner} lead={partner.lead} />
                        ))}
                    </div>
                </div>
            ))}
            <div className="sea-hack__logo-marquee" aria-hidden="true">
                <div className="sea-hack__logo-track">
                    {PARTNER_LOGOS.map((partner) => (
                        <div
                            key={partner.name}
                            className={`sea-hack__logo-chip${partner.dark ? ' sea-hack__logo-chip--dark' : ''}`}
                        >
                            <img src={partner.logo} alt="" />
                        </div>
                    ))}
                    {PARTNER_LOGOS.map((partner) => (
                        <div
                            key={`loop-${partner.name}`}
                            className={`sea-hack__logo-chip${partner.dark ? ' sea-hack__logo-chip--dark' : ''}`}
                            aria-hidden="true"
                        >
                            <img src={partner.logo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default HackathonPartners;
