import { useDispatch } from "react-redux"
import { setStore } from "../../actions/utils"
import { loadState } from "../../reducers/utils"
import { Title } from "../Title"
import ProjectInfo from "./ProjectInfo"
import style from './profile.module.scss'
import { useEffect, useState } from "react"
import { getProjects } from "../../actions/user"
import { ReactComponent as Previous } from "../../img/caret-left-solid.svg";
import { ReactComponent as Next } from "../../img/caret-right-solid.svg";
import SearchBar from "./SearchBar"
import { useDebounce } from "use-debounce"
import { useTranslation } from "react-i18next"
import { networkError, searchValue1 } from "../../utils/description"

const LoadProject = (props) => {
   const title = 'loadProject'
   const emptyCustomer = ''
   const NOT_FOUND = 'projects not found'
   const {t} = useTranslation()
   const dispatch = useDispatch()
   const limit = 6
   const [isLoading, setIsLoading] = useState(false)
   const [page, setPage] = useState(1)
   const [projects, setProjects] = useState([])
   const [pages, setPages] = useState(1)
   const [searchTerm, setSearchTerm] = useState({term: '', type: searchValue1})
   const [debouncedTerm] = useDebounce(searchTerm.term, 500);
   
   useEffect(() => {
      const getData = async () => {
         try {
            setIsLoading(true)
            const response = await getProjects(props.user, emptyCustomer, searchTerm.term, searchTerm.type, page)
            if (!response) throw new Error(networkError)
            response.projects ? setProjects(response.projects) : setProjects([])
            setPages(Math.ceil(response.count / limit))
            if (page > pages && pages > 0) setPage(pages)
            if (page > pages && pages === 0) setPage(1)
         } catch(e) {
            console.log(e.message)
         } finally {
            setIsLoading(false)
         }
      }
      getData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, projects.length, props.user, debouncedTerm])
   
   const loadProject = (projectId) => {
      const currentProject = projects.find((project) => project._id === projectId)
      let state = loadState(JSON.parse(currentProject.product))
      dispatch(setStore(state))
      props.setModal(false)
   }

   if (isLoading) return <div>Loading...</div>

   return (
      <div className={style.loadProject}>
         <Title className={style.title} title={title} />
         <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
         {projects.length > 0
            ? <div className={style.projectContainer}>
               {projects.map((project) => 
                  <ProjectInfo key={project._id} project={project} setProject={loadProject} />
               )}
            </div>
            : <div className={style.noProject}>{t(NOT_FOUND)}</div>
         }
         <div className={style.buttons}>
            {page > 1 && <Previous onClick={() => setPage(page => page - 1)}/>}
            {page < pages && <Next onClick={() => setPage(page => page + 1)}/>}
         </div>
         
      </div>
   )
}

export default LoadProject
