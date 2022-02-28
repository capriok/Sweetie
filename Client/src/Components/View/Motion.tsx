import { ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import 'Styles/components/view/motion.scss'

interface Props {
	visible: boolean
	variants: any
	component: ReactElement<any>
}

const ViewMotion: React.FC<Props> = (props) => {
	const { visible, variants, component } = props

	const motionProps = {
		whileInView: 'visible',
		initial: 'hidden',
		exit: 'exit',
		viewport: { once: true },
		transition: {
			type: 'spring',
			duration: 0.1,
			stiffness: 80,
			mass: .6
		},
		variants
	}

	return (
		<AnimatePresence>
			{visible &&
				<motion.div {...motionProps}>
					<div className="animated-content">
						{component}
					</div>
				</motion.div>
			}
		</AnimatePresence>
	)
}

export default ViewMotion