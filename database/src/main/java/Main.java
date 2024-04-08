import entity.StockSector;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.criteria.HibernateCriteriaBuilder;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        SessionFactory sessionFactory = new Configuration().configure().buildSessionFactory();
        HibernateCriteriaBuilder builder = (HibernateCriteriaBuilder) sessionFactory.getCriteriaBuilder();
        CriteriaQuery<StockSector> query = builder.createQuery(StockSector.class);
        Root<StockSector> stockSector = query.from(StockSector.class);
        String sector = "Technology";
        query.select(stockSector).where(builder.equal(stockSector.get("sectorName"), sector));

        Session s = sessionFactory.openSession();
        List<StockSector> stockSectors = s.createQuery(query).getResultList();

        for (StockSector stockSector1 : stockSectors) {
            System.out.println(stockSector1.getId() + " " + stockSector1.getSectorName());
        }
    }
}
